import { Redirect } from 'expo-router';

import { useSettingsStore } from '@/store/settingsStore';

export default function IndexScreen() {
  const onboardingCompleted = useSettingsStore((state) => state.settings.onboardingCompleted);

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
