import { zodResolver } from '@hookform/resolvers/zod';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { z } from 'zod';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';
import { PaymentMethod, Transaction, TransactionType } from '@/types/transaction';

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((value) => Number(value) > 0, 'Amount must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
  note: z.string().optional(),
  paymentMethod: z.enum(['cash', 'wallet', 'bank', 'card']),
});

type FormValues = z.infer<typeof schema>;

interface TransactionFormProps {
  type: TransactionType;
  editing?: Transaction;
  initialCategoryId?: string;
}

const QUICK_AMOUNTS: Record<TransactionType, number[]> = {
  expense: [100, 500, 1000, 5000],
  income: [1000, 5000, 10000, 20000],
};

const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'wallet', 'bank', 'card'];

export function TransactionForm({ type, editing, initialCategoryId }: TransactionFormProps) {
  const router = useRouter();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const allCategories = useCategoryStore((state) => state.categories);
  const categories = useMemo(
    () => allCategories.filter((category) => category.type === type),
    [allCategories, type],
  );

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: editing ? String(editing.amount) : '',
      categoryId: editing?.categoryId ?? initialCategoryId ?? categories[0]?.id ?? '',
      note: editing?.note ?? '',
      paymentMethod: editing?.paymentMethod ?? 'cash',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const category = categories.find((item) => item.id === values.categoryId);
    if (!category) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (editing) {
      updateTransaction(editing.id, {
        amount: Number(values.amount),
        categoryId: values.categoryId,
        categoryName: category.name,
        note: values.note?.trim() ?? '',
        paymentMethod: values.paymentMethod,
      });
    } else {
      addTransaction({
        amount: Number(values.amount),
        type,
        categoryId: values.categoryId,
        categoryName: category.name,
        note: values.note?.trim() ?? '',
        paymentMethod: values.paymentMethod,
        date: new Date().toISOString(),
      });
    }

    router.back();
  });

  return (
    <View className="gap-5">
      <View className="items-center rounded-2xl bg-card p-4 shadow-soft">
        <Text className="text-sm text-textSecondary">Amount</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              className="mt-2 w-full text-center text-5xl font-bold text-textPrimary"
            />
          )}
        />
        {errors.amount && <Text className="mt-1 text-sm text-danger">{errors.amount.message}</Text>}
      </View>

      <View className="flex-row justify-between gap-2">
        {QUICK_AMOUNTS[type].map((amount) => (
          <Pressable
            key={amount}
            onPress={() => setValue('amount', String(amount))}
            className="flex-1 rounded-xl border border-border bg-white px-2 py-3"
          >
            <Text className="text-center text-sm font-semibold text-textPrimary">+{amount}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <Text className="mb-2 text-sm font-medium text-textSecondary">Category</Text>
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row flex-wrap gap-2">
              {categories.map((category) => {
                const active = value === category.id;
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => onChange(category.id)}
                    className={`rounded-xl border px-4 py-2 ${
                      active ? 'border-primary bg-green-50' : 'border-border bg-white'
                    }`}
                  >
                    <Text className={`font-medium ${active ? 'text-primary' : 'text-textPrimary'}`}>
                      {category.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
      </View>

      <View>
        <Text className="mb-2 text-sm font-medium text-textSecondary">Payment Method</Text>
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row gap-2">
              {PAYMENT_METHODS.map((method) => {
                const active = value === method;
                return (
                  <Pressable
                    key={method}
                    onPress={() => onChange(method)}
                    className={`flex-1 rounded-xl border px-2 py-3 ${
                      active ? 'border-primary bg-green-50' : 'border-border bg-white'
                    }`}
                  >
                    <Text className={`text-center text-xs font-semibold ${active ? 'text-primary' : 'text-textPrimary'}`}>
                      {method.toUpperCase()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        />
      </View>

      <View>
        <Text className="mb-2 text-sm font-medium text-textSecondary">Note (optional)</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Add note"
              placeholderTextColor="#9CA3AF"
              className="rounded-2xl border border-border bg-white px-4 py-3 text-textPrimary"
            />
          )}
        />
      </View>

      <PrimaryButton
        label={editing ? `Update ${type === 'expense' ? 'Expense' : 'Income'}` : `Save ${type === 'expense' ? 'Expense' : 'Income'}`}
        onPress={onSubmit}
        loading={isSubmitting}
      />
    </View>
  );
}
