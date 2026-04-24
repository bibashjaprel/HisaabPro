import { Text, View } from 'react-native';

interface SummaryCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function SummaryCard({ label, value, valueClassName = 'text-textPrimary' }: SummaryCardProps) {
  return (
    <View className="flex-1 rounded-2xl bg-card p-4 shadow-soft">
      <Text className="text-xs text-textSecondary">{label}</Text>
      <Text className={`mt-1 text-xl font-bold ${valueClassName}`}>{value}</Text>
    </View>
  );
}
