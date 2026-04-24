import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { SummaryCard } from '@/components/cards/SummaryCard';
import { TransactionItem } from '@/components/transactions/TransactionItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { DEFAULT_EXPENSE_CATEGORIES } from '@/constants/categories';
import { balance, totalByType } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatCurrency';
import { useSettingsStore } from '@/store/settingsStore';
import { useTransactionStore } from '@/store/transactionStore';

export default function HomeScreen() {
  const router = useRouter();
  const userName = useSettingsStore((state) => state.settings.userName);
  const transactions = useTransactionStore((state) => state.transactions);

  const totalIncome = totalByType(transactions, 'income');
  const totalExpense = totalByType(transactions, 'expense');
  const totalBalance = balance(transactions);

  return (
    <Screen scroll>
      <View className="py-4 pb-28">
        <View className="mb-5 flex-row items-center justify-between">
          <View>
            <Text className="text-base text-textSecondary">Hello {userName}</Text>
            <Text className="text-4xl font-bold text-textPrimary">Dashboard</Text>
          </View>
          <Pressable
            onPress={() => router.push('/search')}
            className="h-14 w-14 items-center justify-center rounded-2xl border border-border bg-white"
          >
            <Ionicons name="search" size={26} color="#111827" />
          </Pressable>
        </View>

        <View className="mb-4 rounded-3xl bg-primary px-6 py-6">
          <Text className="text-base text-white/85">Total Balance</Text>
          <Text className="mt-1 text-5xl font-bold text-white">
            {formatCurrency(totalBalance)}
          </Text>
        </View>

        <View className="mb-4 flex-row gap-3">
          <SummaryCard label="Income" value={formatCurrency(totalIncome)} valueClassName="text-primary" />
          <SummaryCard label="Expense" value={formatCurrency(totalExpense)} valueClassName="text-danger" />
        </View>

        <View className="mb-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-textPrimary">Quick Actions</Text>
            <Pressable onPress={() => router.push('/categories')}>
              <Text className="text-lg font-medium text-primary">Manage</Text>
            </Pressable>
          </View>
          <View className="flex-row gap-2">
            {DEFAULT_EXPENSE_CATEGORIES.slice(0, 4).map((category) => (
              <Pressable
                key={category.id}
                onPress={() =>
                  router.push({ pathname: '/add-expense', params: { categoryId: category.id } })
                }
                className="flex-1 rounded-2xl border border-border bg-white px-2 py-3"
              >
                <Text className="text-center text-base font-medium text-textPrimary">{category.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-textPrimary">Recent Transactions</Text>
            <Pressable onPress={() => router.push('/search')}>
              <Text className="text-lg font-medium text-primary">See all</Text>
            </Pressable>
          </View>

          {transactions.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Tap the plus button to add your first expense or income."
            />
          ) : (
            transactions
              .slice(0, 6)
              .map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onPress={() => router.push(`/transaction/${transaction.id}`)}
                />
              ))
          )}
        </View>
      </View>
    </Screen>
  );
}
