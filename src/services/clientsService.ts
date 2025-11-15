import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Client } from '@/types';

const getClientsCollection = (userId: string) => {
  return collection(db, 'users', userId, 'clients');
};

export const clientsService = {
  // Get all clients for a user
  async getClients(userId: string): Promise<Client[]> {
    try {
      const clientsRef = getClientsCollection(userId);
      const q = query(clientsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  },

  // Add a new client
  async addClient(userId: string, client: Omit<Client, 'id'>): Promise<string> {
    try {
      const clientsRef = getClientsCollection(userId);
      const docRef = await addDoc(clientsRef, client);
      return docRef.id;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  },

  // Update an existing client
  async updateClient(userId: string, clientId: string, updates: Partial<Client>): Promise<void> {
    try {
      const clientsRef = getClientsCollection(userId);
      const clientDoc = doc(clientsRef, clientId);
      await updateDoc(clientDoc, updates);
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  // Delete a client
  async deleteClient(userId: string, clientId: string): Promise<void> {
    try {
      const clientsRef = getClientsCollection(userId);
      const clientDoc = doc(clientsRef, clientId);
      await deleteDoc(clientDoc);
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};

