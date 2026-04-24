export type TransactionType = 'expense' | 'income';

export type PaymentMethod = 'cash' | 'wallet' | 'bank' | 'card';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  categoryName: string;
  note: string;
  paymentMethod: PaymentMethod;
  date: string;
  createdAt: string;
  updatedAt: string;
}
