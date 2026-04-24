import { Image } from 'expo-image';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { useSettingsStore } from '@/store/settingsStore';

export default function ProfileScreen() {
  const { settings, updateSettings } = useSettingsStore((state) => ({
    settings: state.settings,
    updateSettings: state.updateSettings,
  }));

  return (
    <Screen scroll>
      <View className="py-3">
        <Text className="mb-4 text-2xl font-bold text-textPrimary">Profile</Text>

        <View className="mb-4 rounded-2xl bg-card p-4 shadow-soft">
          <View className="flex-row items-center gap-3">
            <Image source={require('../../../assets/icon.png')} style={{ width: 52, height: 52 }} />
            <View className="flex-1">
              <TextInput
                value={settings.userName}
                onChangeText={(text) => updateSettings({ userName: text || 'Bibas' })}
                className="rounded-xl border border-border px-3 py-2 text-base font-semibold text-textPrimary"
              />
              <Text className="mt-1 text-xs text-textSecondary">hisaabpro@app.local</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 rounded-2xl bg-card p-4 shadow-soft">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-sm text-textSecondary">Currency</Text>
            <Text className="font-semibold text-textPrimary">NPR (Rs)</Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-textSecondary">Dark Mode (UI only)</Text>
            <Switch
              value={settings.darkModeEnabled}
              onValueChange={(value) => updateSettings({ darkModeEnabled: value })}
              trackColor={{ true: '#22C55E' }}
            />
          </View>
        </View>

        <View className="rounded-2xl bg-card p-4 shadow-soft">
          {['Export Data', 'Backup & Restore', 'About HisaabPro'].map((item) => (
            <Pressable key={item} className="mb-2 rounded-xl border border-border px-4 py-3">
              <Text className="font-medium text-textPrimary">{item} (Coming soon)</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}
