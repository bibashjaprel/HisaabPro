import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { TransactionForm } from '@/components/forms/TransactionForm';
import { Screen } from '@/components/ui/Screen';
import { useTransactionStore } from '@/store/transactionStore';

export default function AddIncomeScreen() {
  const { transactionId } = useLocalSearchParams<{ transactionId?: string }>();
  const transaction = useTransactionStore((state) =>
    transactionId ? state.transactions.find((item) => item.id === transactionId) : undefined,
  );

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">
          {transaction ? 'Edit Income' : 'Add Income'}
        </Text>
        <TransactionForm type="income" editing={transaction} />
      </View>
    </Screen>
  );
}
