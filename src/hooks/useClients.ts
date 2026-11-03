import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { clientsAtom, selectedClientAtom } from '@/store/clients';
import { clientsService } from '@/services/clientsService';
import { useAuth } from '@/hooks/useAuth';
import type { Client, ClientFormData, Measurements } from '@/types';

export function useClients() {
  const [clients, setClients] = useAtom(clientsAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  // The id of the user whose clients are loaded; loading until it matches.
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const { user } = useAuth();
  const userId = user?.id;
  const isLoading = !!userId && loadedUserId !== userId;

  // Load clients from Supabase when user is authenticated
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    clientsService
      .getClients(userId)
      .then((fetchedClients) => {
        if (!cancelled) setClients(fetchedClients);
      })
      .catch((error) => console.error('Failed to load clients:', error))
      .finally(() => {
        if (!cancelled) setLoadedUserId(userId);
      });
    return () => {
      cancelled = true;
      // Don't show one user's clients to the next one who signs in.
      setClients([]);
    };
  }, [userId, setClients]);

  const handleAddClient = () => {
    setEditingClient(null);
    setIsFormDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsFormDialogOpen(true);
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedClient(null);
  };

  const handleSaveClient = async (formData: ClientFormData) => {
    if (!user) return;

    const amountCharged = formData.amountCharged || 0;
    const advancePaid = formData.advancePaid || 0;
    const balance = amountCharged - advancePaid;
    const now = new Date().toISOString();

    try {
      if (editingClient) {
        // Update existing client
        const updates = {
          ...formData,
          balance,
          updatedAt: now,
        };
        await clientsService.updateClient(user.id, editingClient.id, updates);
        
        // Update local state
        setClients(
          clients.map((client) =>
            client.id === editingClient.id
              ? { ...client, ...updates }
              : client
          )
        );
      } else {
        // Add new client
        const newClientData = {
          ...formData,
          balance,
          createdAt: now,
          updatedAt: now,
        };
        const clientId = await clientsService.addClient(user.id, newClientData);
        
        // Update local state
        const newClient: Client = {
          id: clientId,
          ...newClientData,
        };
        setClients([...clients, newClient]);
      }
      setEditingClient(null);
    } catch (error) {
      console.error('Failed to save client:', error);
      throw error;
    }
  };

  const handleUpdateMeasurements = async (measurements: Measurements) => {
    if (!selectedClient || !user) return;

    try {
      const updatedAt = new Date().toISOString();
      await clientsService.updateClient(user.id, selectedClient.id, {
        measurements,
        updatedAt,
      });

      // Update local state
      const updatedClient: Client = {
        ...selectedClient,
        measurements,
        updatedAt,
      };

      setClients(
        clients.map((client) => (client.id === selectedClient.id ? updatedClient : client))
      );
      setSelectedClient(updatedClient);
    } catch (error) {
      console.error('Failed to update measurements:', error);
      throw error;
    }
  };

  const handleDeleteClient = async (clientToDelete: Client) => {
    if (!user) return;

    if (window.confirm(`Are you sure you want to delete ${clientToDelete.name}? This action cannot be undone.`)) {
      try {
        await clientsService.deleteClient(user.id, clientToDelete.id);
        
        // Update local state
        setClients(clients.filter((client) => client.id !== clientToDelete.id));
        if (selectedClient?.id === clientToDelete.id) {
          setViewMode('list');
          setSelectedClient(null);
        }
      } catch (error) {
        console.error('Failed to delete client:', error);
        alert('Failed to delete client. Please try again.');
      }
    }
  };

  const handleMarkPaid = async (client: Client) => {
    if (!user) return;

    try {
      await clientsService.updateClient(user.id, client.id, {
        isPaid: true,
        balance: 0,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      const updatedClient: Client = {
        ...client,
        isPaid: true,
        balance: 0,
        updatedAt: new Date().toISOString(),
      };

      setClients(
        clients.map((c) => (c.id === client.id ? updatedClient : c))
      );
      
      if (selectedClient?.id === client.id) {
        setSelectedClient(updatedClient);
      }
    } catch (error) {
      console.error('Failed to mark client as paid:', error);
      alert('Failed to mark client as paid. Please try again.');
    }
  };

  const closeFormDialog = () => {
    setIsFormDialogOpen(false);
    setEditingClient(null);
  };

  const openEditDialog = (client: Client) => {
    setEditingClient(client);
    setIsFormDialogOpen(true);
  };

  return {
    clients,
    selectedClient,
    isFormDialogOpen,
    editingClient,
    viewMode,
    isLoading,
    handleAddClient,
    handleEditClient,
    handleViewClient,
    handleBackToList,
    handleSaveClient,
    handleUpdateMeasurements,
    handleDeleteClient,
    handleMarkPaid,
    setIsFormDialogOpen,
    closeFormDialog,
    openEditDialog,
  };
}

