import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SummaryCard } from '@/components/cards/SummaryCard';
import { ReportCharts } from '@/components/charts/ReportCharts';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { totalByType } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatCurrency';
import { useTransactionStore } from '@/store/transactionStore';

const FILTERS = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
type Filter = (typeof FILTERS)[number];

export default function ReportsScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [filter, setFilter] = useState<Filter>('Monthly');
  const [monthOffset, setMonthOffset] = useState(0);

  const rangeTransactions = useMemo(() => {
    const now = new Date();
    const selectedMonthDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);

    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      if (filter === 'Daily') return date.toDateString() === now.toDateString();
      if (filter === 'Weekly') {
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        return date >= lastWeek;
      }
      if (filter === 'Monthly') {
        return (
          date.getMonth() === selectedMonthDate.getMonth() &&
          date.getFullYear() === selectedMonthDate.getFullYear()
        );
      }

      return date.getFullYear() === now.getFullYear();
    });
  }, [filter, monthOffset, transactions]);

  const totalIncome = totalByType(rangeTransactions, 'income');
  const totalExpense = totalByType(rangeTransactions, 'expense');

  const expenseByCategory = rangeTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce<Record<string, number>>((acc, transaction) => {
      acc[transaction.categoryName] = (acc[transaction.categoryName] ?? 0) + transaction.amount;
      return acc;
    }, {});

  const palette = ['#16A34A', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6'];
  const donutData = Object.entries(expenseByCategory).map(([name, value], index) => ({
    value,
    text: name,
    color: palette[index % palette.length],
  }));

  const dayMap = new Map<string, number>();
  rangeTransactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      const day = String(new Date(transaction.date).getDate());
      dayMap.set(day, (dayMap.get(day) ?? 0) + transaction.amount);
    });

  const barData = Array.from(dayMap.entries())
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .slice(-10)
    .map(([label, value]) => ({ label, value }));

  const monthLabel = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + monthOffset,
    1,
  ).toLocaleDateString('en-NP', { month: 'long', year: 'numeric' });

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">Reports</Text>

        <View className="mb-4 flex-row gap-2">
          {FILTERS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              className={`rounded-full px-3 py-2 ${
                filter === item ? 'bg-primary' : 'border border-border bg-white'
              }`}
            >
              <Text className={`text-xs font-semibold ${filter === item ? 'text-white' : 'text-textPrimary'}`}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {filter === 'Monthly' && (
          <View className="mb-4 flex-row items-center justify-between rounded-xl border border-border bg-white px-4 py-3">
            <Pressable onPress={() => setMonthOffset((value) => value - 1)}>
              <Text className="text-sm font-semibold text-primary">Prev</Text>
            </Pressable>
            <Text className="text-sm font-semibold text-textPrimary">{monthLabel}</Text>
            <Pressable onPress={() => setMonthOffset((value) => value + 1)}>
              <Text className="text-sm font-semibold text-primary">Next</Text>
            </Pressable>
          </View>
        )}

        <View className="mb-4 flex-row gap-3">
          <SummaryCard label="Total Expense" value={formatCurrency(totalExpense)} valueClassName="text-danger" />
          <SummaryCard label="Total Income" value={formatCurrency(totalIncome)} valueClassName="text-primary" />
        </View>

        {rangeTransactions.length === 0 ? (
          <EmptyState
            title="No report data"
            description="Add transactions to unlock charts and category insights."
          />
        ) : (
          <>
            <ReportCharts donutData={donutData} barData={barData} />
            <View className="mt-4 rounded-2xl bg-card p-4 shadow-soft">
              <Text className="mb-2 text-base font-semibold text-textPrimary">Category Breakdown</Text>
              {Object.entries(expenseByCategory).map(([name, value]) => (
                <View key={name} className="mb-2 flex-row items-center justify-between">
                  <Text className="text-sm text-textPrimary">{name}</Text>
                  <Text className="text-sm font-semibold text-textPrimary">{formatCurrency(value)}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}
