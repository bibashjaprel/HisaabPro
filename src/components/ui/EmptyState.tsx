import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="items-center rounded-2xl border border-dashed border-border bg-card px-6 py-10">
      <Ionicons name="wallet-outline" size={34} color="#94A3B8" />
      <Text className="mt-3 text-lg font-semibold text-textPrimary">{title}</Text>
      <Text className="mt-2 text-center text-sm text-textSecondary">{description}</Text>
    </View>
  );
}
