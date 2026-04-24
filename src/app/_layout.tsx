import '@/../global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useCategoryStore } from '@/store/categoryStore';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const ensureSeeded = useCategoryStore((state) => state.ensureSeeded);
  const [ready, setReady] = useState(false);

  const hydrated = useMemo(
    () =>
      useCategoryStore.persist.hasHydrated() &&
      useCategoryStore.persist.hasHydrated(),
    [],
  );

  useEffect(() => {
    ensureSeeded();

    const timeout = setTimeout(async () => {
      setReady(true);
      await SplashScreen.hideAsync();
    }, hydrated ? 300 : 900);

    return () => clearTimeout(timeout);
  }, [hydrated, ensureSeeded]);

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <Image source={require('../../assets/splash.png')} style={{ width: 220, height: 220 }} />
        <Text className="mt-4 text-xl font-bold text-navy">HisaabPro</Text>
        <Text className="mt-1 text-sm text-textSecondary">Smart hisaab for everyday life</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8FAFC' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-expense" options={{ presentation: 'card' }} />
      <Stack.Screen name="add-income" options={{ presentation: 'card' }} />
      <Stack.Screen name="categories" options={{ presentation: 'card' }} />
      <Stack.Screen name="search" options={{ presentation: 'card' }} />
      <Stack.Screen name="transaction/[id]" options={{ presentation: 'card' }} />
    </Stack>
  );
}
