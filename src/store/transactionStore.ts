import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Transaction } from '@/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (input: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTransaction: (id: string, patch: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (input) => {
        const now = new Date().toISOString();
        const id = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const transaction: Transaction = {
          ...input,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ transactions: [transaction, ...state.transactions] }));
        return id;
      },
      updateTransaction: (id, patch) =>
        set((state) => ({
          transactions: state.transactions.map((transaction) =>
            transaction.id === id
              ? { ...transaction, ...patch, updatedAt: new Date().toISOString() }
              : transaction,
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
        })),
      getTransactionById: (id) => get().transactions.find((transaction) => transaction.id === id),
    }),
    {
      name: 'hisaabpro_transactions_v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
