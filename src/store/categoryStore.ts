import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { Category } from '@/types/category';
import { TransactionType } from '@/types/transaction';

interface CategoryState {
  categories: Category[];
  ensureSeeded: () => void;
  addCategory: (input: Omit<Category, 'id' | 'createdAt' | 'isDefault'>) => void;
  updateCategory: (id: string, patch: Partial<Pick<Category, 'name' | 'color' | 'icon'>>) => void;
  deleteCategory: (id: string) => void;
  getByType: (type: TransactionType) => Category[];
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: DEFAULT_CATEGORIES,
      ensureSeeded: () => {
        if (get().categories.length === 0) {
          set({ categories: DEFAULT_CATEGORIES });
        }
      },
      addCategory: (input) => {
        const category: Category = {
          ...input,
          id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          isDefault: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ categories: [category, ...state.categories] }));
      },
      updateCategory: (id, patch) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...patch } : category,
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => !(category.id === id && !category.isDefault),
          ),
        })),
      getByType: (type) => get().categories.filter((category) => category.type === type),
    }),
    {
      name: 'hisaabpro_categories_v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
