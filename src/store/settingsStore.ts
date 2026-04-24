import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Settings } from '@/types/settings';

interface SettingsState {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  userName: 'Bibas',
  currency: 'NPR',
  onboardingCompleted: false,
  darkModeEnabled: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: 'hisaabpro_settings_v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
