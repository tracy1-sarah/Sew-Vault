export interface Measurements {
  bust?: number;
  waist?: number;
  shoulderToWaist?: number;
  hip?: number;
  shoulderToHip?: number;
  shoulderToNipple?: number;
  fullLength?: number;
}

export interface Client {
  id: string;
  name: string;
  date: string;
  phoneNumber: string;
  amountCharged?: number | null;
  advancePaid?: number | null;
  balance: number;
  isPaid?: boolean;
  measurements: Measurements;
  createdAt?: string;
  updatedAt?: string;
}

export type ClientFormData = Omit<Client, 'id' | 'balance' | 'createdAt' | 'updatedAt'>;

