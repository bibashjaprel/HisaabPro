import { Redirect } from 'expo-router';

import { useSettingsStore } from '@/store/settingsStore';

export default function IndexScreen() {
  const hydrated = useSettingsStore.persist.hasHydrated();
  const onboardingCompleted = useSettingsStore((state) => state.settings.onboardingCompleted);

  if (!hydrated) {
    return null;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
