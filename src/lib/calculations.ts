import { Transaction } from '@/types/transaction';

export function totalByType(transactions: Transaction[], type: 'income' | 'expense'): number {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function balance(transactions: Transaction[]): number {
  const income = totalByType(transactions, 'income');
  const expense = totalByType(transactions, 'expense');
  return income - expense;
}

export function groupExpenseByCategory(transactions: Transaction[]): Record<string, number> {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce<Record<string, number>>((acc, transaction) => {
      acc[transaction.categoryName] = (acc[transaction.categoryName] ?? 0) + transaction.amount;
      return acc;
    }, {});
}
