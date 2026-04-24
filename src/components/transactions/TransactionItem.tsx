import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { formatDate } from '@/lib/date';
import { formatCurrency } from '@/lib/formatCurrency';
import { Transaction } from '@/types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const isExpense = transaction.type === 'expense';

  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-2xl bg-card p-4 shadow-soft"
    >
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-bg">
        <Ionicons
          name={isExpense ? 'arrow-down-circle' : 'arrow-up-circle'}
          size={20}
          color={isExpense ? '#EF4444' : '#16A34A'}
        />
      </View>

      <View className="flex-1">
        <Text className="text-sm font-semibold text-textPrimary">{transaction.categoryName}</Text>
        <Text className="text-xs text-textSecondary">{formatDate(transaction.date)}</Text>
      </View>

      <Text className={`text-sm font-semibold ${isExpense ? 'text-danger' : 'text-primary'}`}>
        {isExpense ? '-' : '+'}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}
