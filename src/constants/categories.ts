import { Category } from '@/types/category';

const now = new Date().toISOString();

export const DEFAULT_EXPENSE_CATEGORIES: Category[] = [
  { id: 'exp_food', name: 'Food', type: 'expense', icon: 'fast-food', color: '#16A34A', isDefault: true, createdAt: now },
  { id: 'exp_travel', name: 'Travel', type: 'expense', icon: 'car', color: '#3B82F6', isDefault: true, createdAt: now },
  { id: 'exp_shopping', name: 'Shopping', type: 'expense', icon: 'cart', color: '#F59E0B', isDefault: true, createdAt: now },
  { id: 'exp_rent', name: 'Rent', type: 'expense', icon: 'home', color: '#8B5CF6', isDefault: true, createdAt: now },
  { id: 'exp_health', name: 'Health', type: 'expense', icon: 'medkit', color: '#EF4444', isDefault: true, createdAt: now },
  { id: 'exp_entertainment', name: 'Entertainment', type: 'expense', icon: 'game-controller', color: '#06B6D4', isDefault: true, createdAt: now },
  { id: 'exp_education', name: 'Education', type: 'expense', icon: 'school', color: '#0EA5E9', isDefault: true, createdAt: now },
  { id: 'exp_other', name: 'Other', type: 'expense', icon: 'ellipsis-horizontal-circle', color: '#64748B', isDefault: true, createdAt: now },
];

export const DEFAULT_INCOME_CATEGORIES: Category[] = [
  { id: 'inc_salary', name: 'Salary', type: 'income', icon: 'cash', color: '#16A34A', isDefault: true, createdAt: now },
  { id: 'inc_business', name: 'Business', type: 'income', icon: 'briefcase', color: '#2563EB', isDefault: true, createdAt: now },
  { id: 'inc_gift', name: 'Gift', type: 'income', icon: 'gift', color: '#A855F7', isDefault: true, createdAt: now },
  { id: 'inc_freelance', name: 'Freelance', type: 'income', icon: 'laptop', color: '#06B6D4', isDefault: true, createdAt: now },
  { id: 'inc_other', name: 'Other', type: 'income', icon: 'ellipsis-horizontal-circle', color: '#64748B', isDefault: true, createdAt: now },
];

export const DEFAULT_CATEGORIES: Category[] = [
  ...DEFAULT_EXPENSE_CATEGORIES,
  ...DEFAULT_INCOME_CATEGORIES,
];
