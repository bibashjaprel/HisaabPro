import { ActivityIndicator, Pressable, Text } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const styles = {
    primary: 'bg-primary',
    secondary: 'bg-white border border-border',
    danger: 'bg-danger',
  }[variant];

  const textColor = variant === 'secondary' ? 'text-textPrimary' : 'text-white';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={`h-12 items-center justify-center rounded-2xl ${styles}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#111827' : '#FFFFFF'} />
      ) : (
        <Text className={`text-base font-semibold ${textColor}`}>{label}</Text>
      )}
    </Pressable>
  );
}
