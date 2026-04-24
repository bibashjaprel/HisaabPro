import { Image } from 'expo-image';
import { Text, View } from 'react-native';

export default function SplashRoute() {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <Image source={require('../../assets/splash.png')} style={{ width: 220, height: 220 }} />
      <Text className="mt-4 text-xl font-bold text-navy">HisaabPro</Text>
      <Text className="mt-1 text-sm text-textSecondary">Loading...</Text>
    </View>
  );
}
