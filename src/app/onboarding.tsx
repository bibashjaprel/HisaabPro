import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Screen } from '@/components/ui/Screen';
import { useSettingsStore } from '@/store/settingsStore';

const slides = [
  {
    title: 'Track your kharcha',
    description: 'Record daily expense and income in seconds.',
  },
  {
    title: 'Understand cashflow',
    description: 'Simple reports for better monthly decisions.',
  },
  {
    title: 'Stay in control',
    description: 'Offline-first Nepali expense tracking made easy.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const updateSettings = useSettingsStore((state) => state.updateSettings);
  const [index, setIndex] = useState(0);

  const completeOnboarding = () => {
    updateSettings({ onboardingCompleted: true });
    router.replace('/(tabs)/home');
  };

  const isLast = index === slides.length - 1;

  return (
    <Screen>
      <View className="flex-1 py-4">
        <View className="items-end">
          <Pressable onPress={completeOnboarding}>
            <Text className="text-sm font-medium text-textSecondary">Skip</Text>
          </Pressable>
        </View>

        <View className="mt-3 flex-1 items-center justify-center">
          <Image source={require('../../assets/splash.png')} style={{ width: 240, height: 240 }} />
          <Text className="mt-8 text-3xl font-bold text-textPrimary">{slides[index].title}</Text>
          <Text className="mt-3 px-8 text-center text-base leading-6 text-textSecondary">
            {slides[index].description}
          </Text>
        </View>

        <View className="mb-6 items-center">
          <View className="mb-6 flex-row gap-2">
            {slides.map((_, slideIndex) => (
              <View
                key={slideIndex}
                className={`h-2 rounded-full ${index === slideIndex ? 'w-7 bg-primary' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </View>

          {isLast ? (
            <PrimaryButton label="Start using HisaabPro" onPress={completeOnboarding} />
          ) : (
            <PrimaryButton label="Next" onPress={() => setIndex((value) => value + 1)} />
          )}
        </View>
      </View>
    </Screen>
  );
}
