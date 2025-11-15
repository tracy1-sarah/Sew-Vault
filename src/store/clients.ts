import { atom } from 'jotai';
import type { Client } from '@/types';

export const clientsAtom = atom<Client[]>([]);
export const selectedClientAtom = atom<Client | null>(null);

