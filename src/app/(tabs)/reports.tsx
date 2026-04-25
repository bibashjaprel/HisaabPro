import { Ionicons } from '@expo/vector-icons';
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

      if (filter === 'Daily') {
        return date.toDateString() === now.toDateString();
      }

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
  const netBalance = totalIncome - totalExpense;

  const expenseTransactions = rangeTransactions.filter(
    (transaction) => transaction.type === 'expense',
  );

  const expenseByCategory = expenseTransactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      acc[transaction.categoryName] = (acc[transaction.categoryName] ?? 0) + transaction.amount;
      return acc;
    },
    {},
  );

  const palette = ['#16A34A', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#14B8A6'];
  const donutData = Object.entries(expenseByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], index) => ({
      value,
      text: name,
      color: palette[index % palette.length],
    }));

  const dayMap = new Map<string, number>();
  expenseTransactions.forEach((transaction) => {
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

  const topCategoryEntry = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0];

  return (
    <Screen scroll>
      <View className="py-4 pb-28">
        <View className="mb-5">
          <Text className="text-sm font-medium text-textSecondary">Analytics</Text>
          <Text className="mt-1 text-3xl font-bold text-textPrimary">Reports</Text>
          <Text className="mt-2 text-sm leading-5 text-textSecondary">
            Track spending patterns, compare income, and spot trends faster.
          </Text>
        </View>

        <View className="mb-4 rounded-[28px] border border-border/70 bg-white p-4 shadow-soft">
          <View className="rounded-2xl bg-bg p-1">
            <View className="flex-row">
              {FILTERS.map((item) => {
                const active = filter === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setFilter(item)}
                    className={`flex-1 items-center rounded-2xl px-2 py-3 ${
                      active ? 'bg-primary' : ''
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        active ? 'text-white' : 'text-textSecondary'
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-4 rounded-2xl bg-green-50 px-4 py-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-[0.8px] text-primary">
                  Selected Range
                </Text>
                <Text className="mt-1 text-lg font-semibold text-textPrimary">
                  {filter === 'Monthly' ? monthLabel : filter}
                </Text>
              </View>
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white">
                <Ionicons name="stats-chart" size={20} color="#16A34A" />
              </View>
            </View>

            {filter === 'Monthly' ? (
              <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-white px-3 py-3">
                <Pressable
                  onPress={() => setMonthOffset((value) => value - 1)}
                  className="h-10 w-10 items-center justify-center rounded-xl bg-bg"
                >
                  <Ionicons name="chevron-back" size={18} color="#111827" />
                </Pressable>
                <Text className="text-sm font-semibold text-textPrimary">{monthLabel}</Text>
                <Pressable
                  onPress={() => setMonthOffset((value) => value + 1)}
                  className="h-10 w-10 items-center justify-center rounded-xl bg-bg"
                >
                  <Ionicons name="chevron-forward" size={18} color="#111827" />
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>

        <View className="mb-4">
          <Text className="mb-3 text-lg font-semibold text-textPrimary">Overview</Text>
          <View className="flex-row gap-3">
            <SummaryCard
              label="Total Expense"
              value={formatCurrency(totalExpense)}
              valueClassName="text-danger"
            />
            <SummaryCard
              label="Total Income"
              value={formatCurrency(totalIncome)}
              valueClassName="text-primary"
            />
          </View>
        </View>

        <View className="mb-4 rounded-[28px] border border-border/70 bg-white p-5 shadow-soft">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-textPrimary">Highlights</Text>
              <Text className="mt-1 text-sm text-textSecondary">
                Snapshot of the current reporting range.
              </Text>
            </View>
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-bg">
              <Ionicons
                name={netBalance >= 0 ? 'trending-up' : 'trending-down'}
                size={20}
                color={netBalance >= 0 ? '#16A34A' : '#EF4444'}
              />
            </View>
          </View>

          <View className="mt-5 flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-bg px-4 py-4">
              <Text className="text-xs font-semibold uppercase tracking-[0.7px] text-textSecondary">
                Net Balance
              </Text>
              <Text
                className={`mt-2 text-2xl font-bold ${
                  netBalance >= 0 ? 'text-primary' : 'text-danger'
                }`}
              >
                {formatCurrency(netBalance)}
              </Text>
            </View>

            <View className="flex-1 rounded-2xl bg-bg px-4 py-4">
              <Text className="text-xs font-semibold uppercase tracking-[0.7px] text-textSecondary">
                Top Category
              </Text>
              <Text className="mt-2 text-base font-bold text-textPrimary">
                {topCategoryEntry?.[0] ?? 'No data'}
              </Text>
              <Text className="mt-1 text-sm text-textSecondary">
                {topCategoryEntry ? formatCurrency(topCategoryEntry[1]) : 'Add expenses to see trends'}
              </Text>
            </View>
          </View>
        </View>

        {rangeTransactions.length === 0 ? (
          <EmptyState
            title="No report data"
            description="Add transactions to unlock charts and category insights."
          />
        ) : (
          <ReportCharts
            donutData={donutData}
            barData={barData}
            totalExpense={totalExpense}
          />
        )}
      </View>
    </Screen>
  );
}
