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
      className="mb-3 flex-row items-center rounded-3xl border border-border/70 bg-card px-4 py-4"
    >
      <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-bg">
        <Ionicons
          name={isExpense ? 'arrow-down-circle' : 'arrow-up-circle'}
          size={21}
          color={isExpense ? '#EF4444' : '#16A34A'}
        />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-textPrimary">{transaction.categoryName}</Text>
        <Text className="text-xs text-textSecondary">{formatDate(transaction.date)}</Text>
      </View>

      <Text className={`text-lg font-semibold ${isExpense ? 'text-danger' : 'text-primary'}`}>
        {isExpense ? '-' : '+'}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}
