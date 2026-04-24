import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { TransactionForm } from '@/components/forms/TransactionForm';
import { Screen } from '@/components/ui/Screen';
import { useTransactionStore } from '@/store/transactionStore';

export default function AddExpenseScreen() {
  const { categoryId, transactionId } = useLocalSearchParams<{ categoryId?: string; transactionId?: string }>();
  const transaction = useTransactionStore((state) =>
    transactionId ? state.transactions.find((item) => item.id === transactionId) : undefined,
  );

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">
          {transaction ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <TransactionForm
          type="expense"
          editing={transaction}
          initialCategoryId={categoryId}
        />
      </View>
    </Screen>
  );
}
