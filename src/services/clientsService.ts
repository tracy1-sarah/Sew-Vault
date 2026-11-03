import { supabase } from '@/lib/supabase';
import type { Client, Measurements } from '@/types';

interface ClientRow {
  id: string;
  name: string;
  date: string;
  phone_number: string;
  amount_charged: number | null;
  advance_paid: number | null;
  balance: number;
  is_paid: boolean;
  measurements: Measurements;
  created_at: string;
  updated_at: string;
}

// Postgres returns numeric columns as strings, so convert them back to numbers.
const toNumber = (value: number | string | null) => (value === null ? null : Number(value));

const fromRow = (row: ClientRow): Client => ({
  id: row.id,
  name: row.name,
  date: row.date,
  phoneNumber: row.phone_number,
  amountCharged: toNumber(row.amount_charged),
  advancePaid: toNumber(row.advance_paid),
  balance: Number(row.balance),
  isPaid: row.is_paid,
  measurements: row.measurements ?? {},
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const toRow = (client: Partial<Client>) => {
  const row: Partial<Omit<ClientRow, 'id'>> = {};
  if (client.name !== undefined) row.name = client.name;
  if (client.date !== undefined) row.date = client.date;
  if (client.phoneNumber !== undefined) row.phone_number = client.phoneNumber;
  if (client.amountCharged !== undefined) row.amount_charged = client.amountCharged ?? null;
  if (client.advancePaid !== undefined) row.advance_paid = client.advancePaid ?? null;
  if (client.balance !== undefined) row.balance = client.balance;
  if (client.isPaid !== undefined) row.is_paid = client.isPaid;
  if (client.measurements !== undefined) row.measurements = client.measurements;
  if (client.createdAt !== undefined) row.created_at = client.createdAt;
  if (client.updatedAt !== undefined) row.updated_at = client.updatedAt;
  return row;
};

// Row level security limits every query to the signed-in user's clients;
// the user_id filters are kept so intent is explicit.
export const clientsService = {
  // Get all clients for a user
  async getClients(userId: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
    return (data as ClientRow[]).map(fromRow);
  },

  // Add a new client
  async addClient(userId: string, client: Omit<Client, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('clients')
      .insert({ ...toRow(client), user_id: userId })
      .select('id')
      .single();

    if (error) {
      console.error('Error adding client:', error);
      throw error;
    }
    return data.id;
  },

  // Update an existing client
  async updateClient(userId: string, clientId: string, updates: Partial<Client>): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .update(toRow(updates))
      .eq('id', clientId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  // Delete a client
  async deleteClient(userId: string, clientId: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },
};
