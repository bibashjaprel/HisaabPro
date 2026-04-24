import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { TransactionItem } from '@/components/transactions/TransactionItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';

export default function SearchScreen() {
  const transactions = useTransactionStore((state) => state.transactions);
  const categories = useCategoryStore((state) => state.categories);

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'expense' | 'income'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'cash' | 'wallet' | 'bank' | 'card'>(
    'all',
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<'all' | 'this-month'>('all');

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

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">Search / Filter</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by category or note"
          className="mb-3 rounded-2xl border border-border bg-white px-4 py-3"
        />

        <View className="mb-4 flex-row gap-2">
          {['all', 'expense', 'income'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setTypeFilter(item as 'all' | 'expense' | 'income')}
              className={`rounded-full px-3 py-2 ${
                typeFilter === item
                  ? 'bg-primary'
                  : 'border border-border bg-white'
              }`}
            >
              <Text
                className={`text-sm font-medium ${typeFilter === item ? 'text-white' : 'text-textPrimary'}`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-3 flex-row flex-wrap gap-2">
          {['all', 'cash', 'wallet', 'bank', 'card'].map((item) => (
            <Pressable
              key={item}
              onPress={() =>
                setPaymentFilter(item as 'all' | 'cash' | 'wallet' | 'bank' | 'card')
              }
              className={`rounded-full px-3 py-2 ${
                paymentFilter === item ? 'bg-primary' : 'border border-border bg-white'
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  paymentFilter === item ? 'text-white' : 'text-textPrimary'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-3 flex-row flex-wrap gap-2">
          <Pressable
            onPress={() => setCategoryFilter('all')}
            className={`rounded-full px-3 py-2 ${
              categoryFilter === 'all' ? 'bg-primary' : 'border border-border bg-white'
            }`}
          >
            <Text className={`text-xs ${categoryFilter === 'all' ? 'text-white' : 'text-textPrimary'}`}>
              All categories
            </Text>
          </Pressable>
          {categories.slice(0, 7).map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setCategoryFilter(category.id)}
              className={`rounded-full px-3 py-2 ${
                categoryFilter === category.id ? 'bg-primary' : 'border border-border bg-white'
              }`}
            >
              <Text
                className={`text-xs ${
                  categoryFilter === category.id ? 'text-white' : 'text-textPrimary'
                }`}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-4 flex-row gap-2">
          {['all', 'this-month'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setMonthFilter(item as 'all' | 'this-month')}
              className={`rounded-full px-3 py-2 ${
                monthFilter === item ? 'bg-primary' : 'border border-border bg-white'
              }`}
            >
              <Text className={`text-xs ${monthFilter === item ? 'text-white' : 'text-textPrimary'}`}>
                {item === 'all' ? 'All months' : 'This month'}
              </Text>
            </Pressable>
          ))}
        </View>

        {filtered.length === 0 ? (
          <EmptyState
            title="No matching transactions"
            description="Try a different keyword or clear filters."
          />
        ) : (
          filtered.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </View>
    </Screen>
  );
}
