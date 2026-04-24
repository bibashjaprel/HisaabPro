import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { formatDateTime } from '@/lib/date';
import { formatCurrency } from '@/lib/formatCurrency';
import { useTransactionStore } from '@/store/transactionStore';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const transaction = useTransactionStore((state) => state.transactions.find((item) => item.id === id));
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  if (!transaction) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-textSecondary">Transaction not found.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">Transaction Detail</Text>

        <View className="mb-4 items-center rounded-2xl bg-card p-5 shadow-soft">
          <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-bg">
            <Ionicons name="wallet" size={24} color="#16A34A" />
          </View>
          <Text className="text-sm text-textSecondary">{transaction.categoryName}</Text>
          <Text className="text-4xl font-bold text-textPrimary">{formatCurrency(transaction.amount)}</Text>
        </View>

        <View className="mb-4 rounded-2xl bg-card p-4 shadow-soft">
          <DetailRow label="Date" value={formatDateTime(transaction.date)} />
          <DetailRow label="Payment Method" value={transaction.paymentMethod.toUpperCase()} />
          <DetailRow label="Category" value={transaction.categoryName} />
          <DetailRow label="Note" value={transaction.note || '-'} />
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() =>
              router.push(
                transaction.type === 'expense'
                  ? { pathname: '/add-expense', params: { transactionId: transaction.id } }
                  : { pathname: '/add-income', params: { transactionId: transaction.id } },
              )
            }
            className="flex-1 rounded-2xl border border-border bg-white py-3"
          >
            <Text className="text-center font-semibold text-textPrimary">Edit</Text>
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    deleteTransaction(transaction.id);
                    router.back();
                  },
                },
              ])
            }
            className="flex-1 rounded-2xl bg-danger py-3"
          >
            <Text className="text-center font-semibold text-white">Delete</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 flex-row items-start justify-between">
      <Text className="text-sm text-textSecondary">{label}</Text>
      <Text className="max-w-[65%] text-right text-sm font-medium text-textPrimary">{value}</Text>
    </View>
  );
}
