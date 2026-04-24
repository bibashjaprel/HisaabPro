import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Modal, Pressable, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { z } from 'zod';

import { Screen } from '@/components/ui/Screen';
import { useCategoryStore } from '@/store/categoryStore';

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  icon: z.string().min(1),
  color: z.string().min(1),
  type: z.enum(['expense', 'income']),
});

type FormData = z.infer<typeof schema>;

export default function CategoriesScreen() {
  const { categories, addCategory, deleteCategory, updateCategory } = useCategoryStore((state) => ({
    categories: state.categories,
    addCategory: state.addCategory,
    deleteCategory: state.deleteCategory,
    updateCategory: state.updateCategory,
  }));

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', icon: 'pricetag', color: '#16A34A', type: 'expense' },
  });

  const onSubmit = handleSubmit((values) => {
    if (editingId) {
      updateCategory(editingId, {
        name: values.name,
        icon: values.icon,
        color: values.color,
      });
    } else {
      addCategory({
        name: values.name,
        icon: values.icon,
        color: values.color,
        type: values.type,
      });
    }

    setOpen(false);
    setEditingId(null);
    reset();
  });

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">Manage Categories</Text>

        {categories.map((category) => (
          <View key={category.id} className="mb-3 flex-row items-center rounded-2xl bg-card p-4 shadow-soft">
            <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-bg">
              <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={16} color={category.color} />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-textPrimary">{category.name}</Text>
              <Text className="text-xs text-textSecondary">{category.type}</Text>
            </View>
            <Pressable
              onPress={() => {
                setEditingId(category.id);
                reset({
                  name: category.name,
                  color: category.color,
                  icon: category.icon,
                  type: category.type,
                });
                setOpen(true);
              }}
              className="mr-2"
            >
              <Ionicons name="create-outline" size={18} color="#0F172A" />
            </Pressable>
            <Pressable
              onPress={() => {
                if (category.isDefault) {
                  Alert.alert('Locked', 'Default categories cannot be deleted.');
                  return;
                }

                Alert.alert('Delete Category', 'Are you sure you want to delete this category?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => deleteCategory(category.id) },
                ]);
              }}
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color={category.isDefault ? '#94A3B8' : '#EF4444'}
              />
            </Pressable>
          </View>
        ))}

        <Pressable onPress={() => setOpen(true)} className="rounded-2xl bg-primary py-3">
          <Text className="text-center font-semibold text-white">+ Add Category</Text>
        </Pressable>
      </View>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white p-4">
            <Text className="mb-3 text-lg font-semibold text-textPrimary">
              {editingId ? 'Edit Category' : 'Add Category'}
            </Text>

            <Text className="mb-1 text-sm text-textSecondary">Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Category name"
                  className="mb-3 rounded-xl border border-border px-3 py-2"
                />
              )}
            />

            <Text className="mb-1 text-sm text-textSecondary">Type</Text>
            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => (
                <View className="mb-3 flex-row gap-2">
                  {['expense', 'income'].map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => onChange(item as 'expense' | 'income')}
                      className={`rounded-xl border px-4 py-2 ${
                        value === item ? 'border-primary bg-green-50' : 'border-border'
                      }`}
                    >
                      <Text className="capitalize text-textPrimary">{item}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            />

            <View className="mb-4 flex-row gap-2">
              <Controller
                control={control}
                name="icon"
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Ionicon name"
                    className="flex-1 rounded-xl border border-border px-3 py-2"
                  />
                )}
              />
              <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="#16A34A"
                    className="flex-1 rounded-xl border border-border px-3 py-2"
                  />
                )}
              />
            </View>

            <Pressable onPress={onSubmit} className="rounded-2xl bg-primary py-3">
              <Text className="text-center font-semibold text-white">Save Category</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
