import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { TransactionItem } from '@/components/transactions/TransactionItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';

type TypeFilter = 'all' | 'expense' | 'income';
type PaymentFilter = 'all' | 'cash' | 'wallet' | 'bank' | 'card';
type MonthFilter = 'all' | 'this-month';

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
];

const PAYMENT_OPTIONS: { label: string; value: PaymentFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cash', value: 'cash' },
  { label: 'Wallet', value: 'wallet' },
  { label: 'Bank', value: 'bank' },
  { label: 'Card', value: 'card' },
];

const MONTH_OPTIONS: { label: string; value: MonthFilter }[] = [
  { label: 'All months', value: 'all' },
  { label: 'This month', value: 'this-month' },
];

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl border px-4 py-3 ${
        active ? 'border-primary bg-green-50' : 'border-border bg-white'
      }`}
    >
      <Text
        className={`text-sm font-semibold ${
          active ? 'text-primary' : 'text-textSecondary'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View className="mb-4 rounded-3xl border border-border/70 bg-white p-4 shadow-soft">
      <Text className="mb-3 text-sm font-semibold uppercase tracking-[0.6px] text-textSecondary">
        {title}
      </Text>
      {children}
    </View>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<MonthFilter>('all');

  const filtered = useMemo(() => {
    return transactions.filter((transaction) => {
      const byQuery =
        query.length === 0 ||
        transaction.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        transaction.note.toLowerCase().includes(query.toLowerCase());

      const byType = typeFilter === 'all' || transaction.type === typeFilter;
      const byPayment = paymentFilter === 'all' || transaction.paymentMethod === paymentFilter;
      const byCategory = categoryFilter === 'all' || transaction.categoryId === categoryFilter;

      let byMonth = true;
      if (monthFilter === 'this-month') {
        const now = new Date();
        const date = new Date(transaction.date);
        byMonth = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }

      return byQuery && byType && byPayment && byCategory && byMonth;
    });
  }, [categoryFilter, monthFilter, paymentFilter, query, transactions, typeFilter]);

  const activeFiltersCount = [
    query.length > 0,
    typeFilter !== 'all',
    paymentFilter !== 'all',
    categoryFilter !== 'all',
    monthFilter !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setPaymentFilter('all');
    setCategoryFilter('all');
    setMonthFilter('all');
  };

  return (
    <Screen scroll>
      <View className="py-4 pb-28">
        <View className="mb-5 flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-sm font-medium text-textSecondary">Transactions</Text>
            <Text className="mt-1 text-3xl font-bold text-textPrimary">Search & Filter</Text>
            <Text className="mt-2 text-sm leading-5 text-textSecondary">
              Find expenses and income faster with focused filters.
            </Text>
          </View>

          <Pressable
            onPress={clearFilters}
            className="rounded-2xl border border-border bg-white px-4 py-3"
          >
            <Text className="text-sm font-semibold text-textPrimary">Clear</Text>
          </Pressable>
        </View>

        <View className="mb-4 rounded-[28px] border border-border/70 bg-white p-4 shadow-soft">
          <View className="flex-row items-center rounded-2xl bg-bg px-4 py-3">
            <Ionicons name="search-outline" size={18} color="#6B7280" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by category or note"
              placeholderTextColor="#94A3B8"
              className="ml-3 flex-1 text-base text-textPrimary"
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery('')} className="ml-2">
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </Pressable>
            ) : null}
          </View>

          <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-green-50 px-4 py-3">
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                <Ionicons name="options-outline" size={18} color="#16A34A" />
              </View>
              <View>
                <Text className="text-sm font-semibold text-textPrimary">Active filters</Text>
                <Text className="text-xs text-textSecondary">
                  {activeFiltersCount === 0
                    ? 'No filters applied'
                    : `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`}
                </Text>
              </View>
            </View>
            <Text className="text-sm font-semibold text-primary">{filtered.length} results</Text>
          </View>
        </View>

        <FilterSection title="Type">
          <View className="flex-row gap-2">
            {TYPE_OPTIONS.map((item) => (
              <View key={item.value} className="flex-1">
                <FilterChip
                  label={item.label}
                  active={typeFilter === item.value}
                  onPress={() => setTypeFilter(item.value)}
                />
              </View>
            ))}
          </View>
        </FilterSection>

        <FilterSection title="Payment Method">
          <View className="flex-row flex-wrap gap-2">
            {PAYMENT_OPTIONS.map((item) => (
              <FilterChip
                key={item.value}
                label={item.label}
                active={paymentFilter === item.value}
                onPress={() => setPaymentFilter(item.value)}
              />
            ))}
          </View>
        </FilterSection>

        <FilterSection title="Category">
          <View className="flex-row flex-wrap gap-2">
            <FilterChip
              label="All categories"
              active={categoryFilter === 'all'}
              onPress={() => setCategoryFilter('all')}
            />
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                label={category.name}
                active={categoryFilter === category.id}
                onPress={() => setCategoryFilter(category.id)}
              />
            ))}
          </View>
        </FilterSection>

        <FilterSection title="Date">
          <View className="flex-row gap-2">
            {MONTH_OPTIONS.map((item) => (
              <View key={item.value} className="flex-1">
                <FilterChip
                  label={item.label}
                  active={monthFilter === item.value}
                  onPress={() => setMonthFilter(item.value)}
                />
              </View>
            ))}
          </View>
        </FilterSection>

        <View className="mb-3 mt-1 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-textPrimary">Transactions</Text>
          <Text className="text-sm font-medium text-textSecondary">{filtered.length} found</Text>
        </View>

        {filtered.length === 0 ? (
          <EmptyState
            title="No matching transactions"
            description="Try a different keyword or clear a few filters."
          />
        ) : (
          filtered.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={() => router.push(`/transaction/${transaction.id}`)}
            />
          ))
        )}
      </View>
    </Screen>
  );
}
