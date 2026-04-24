import { Text, View } from 'react-native';

interface SummaryCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function SummaryCard({ label, value, valueClassName = 'text-textPrimary' }: SummaryCardProps) {
  return (
    <View className="flex-1 rounded-3xl border border-border/70 bg-card px-4 py-4">
      <Text className="text-sm font-medium text-textSecondary">{label}</Text>
      <Text className={`mt-1 text-3xl font-semibold ${valueClassName}`}>{value}</Text>
    </View>
  );
}
