import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';

import { Screen } from '@/components/ui/Screen';
import { useSettingsStore } from '@/store/settingsStore';

const menuItems = [
  {
    title: 'Export Data',
    subtitle: 'Download your transactions',
    icon: 'download-outline',
  },
  {
    title: 'Backup & Restore',
    subtitle: 'Keep your data safe',
    icon: 'cloud-upload-outline',
  },
  {
    title: 'About HisaabPro',
    subtitle: 'App version and information',
    icon: 'information-circle-outline',
  },
];

export default function ProfileScreen() {
  const userName = useSettingsStore((state) => state.settings.userName);
  const darkModeEnabled = useSettingsStore((state) => state.settings.darkModeEnabled);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  return (
    <Screen scroll>
      <View className="py-3">
        {/* Header */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-textPrimary">Profile</Text>
          <Text className="mt-1 text-sm text-textSecondary">
            Manage your account and app preferences
          </Text>
        </View>

        {/* Profile Card */}
        <View className="mb-4 rounded-3xl bg-card p-4 shadow-soft">
          <View className="flex-row items-center">
            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Image
                source={require('../../../assets/icon.png')}
                style={{ width: 44, height: 44 }}
                contentFit="contain"
              />
            </View>

            <View className="ml-3 flex-1">
              <Text className="mb-1 text-xs font-medium text-textSecondary">
                Your name
              </Text>

              <TextInput
                value={userName}
                onChangeText={(text) =>
                  updateSettings({ userName: text || 'Bibas' })
                }
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                className="rounded-xl border border-border bg-background px-3 py-2 text-base font-semibold text-textPrimary"
              />

              <Text className="mt-2 text-xs text-textSecondary">
                hisaabpro@app.local
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Card */}
        <View className="mb-4 rounded-3xl bg-card p-4 shadow-soft">
          <Text className="mb-4 text-base font-semibold text-textPrimary">
            Preferences
          </Text>

          <View className="mb-4 flex-row items-center justify-between rounded-2xl bg-background px-4 py-3">
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Ionicons name="cash-outline" size={20} color="#16A34A" />
              </View>

              <View>
                <Text className="font-medium text-textPrimary">Currency</Text>
                <Text className="text-xs text-textSecondary">
                  Default app currency
                </Text>
              </View>
            </View>

            <Text className="font-semibold text-primary">NPR</Text>
          </View>

          <View className="flex-row items-center justify-between rounded-2xl bg-background px-4 py-3">
            <View className="flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Ionicons name="moon-outline" size={20} color="#16A34A" />
              </View>

              <View>
                <Text className="font-medium text-textPrimary">Dark Mode</Text>
                <Text className="text-xs text-textSecondary">
                  UI preview only
                </Text>
              </View>
            </View>

            <Switch
              value={darkModeEnabled}
              onValueChange={(value) =>
                updateSettings({ darkModeEnabled: value })
              }
              trackColor={{
                false: '#D1D5DB',
                true: '#22C55E',
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Menu Card */}
        <View className="rounded-3xl bg-card p-4 shadow-soft">
          <Text className="mb-4 text-base font-semibold text-textPrimary">
            More
          </Text>

          {menuItems.map((item, index) => (
            <Pressable
              key={item.title}
              className={`flex-row items-center rounded-2xl border border-border px-4 py-3 ${index !== menuItems.length - 1 ? 'mb-3' : ''
                }`}
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color="#16A34A"
                />
              </View>

              <View className="flex-1">
                <Text className="font-medium text-textPrimary">
                  {item.title}
                </Text>
                <Text className="text-xs text-textSecondary">
                  {item.subtitle}
                </Text>
              </View>

              <View className="rounded-full bg-gray-100 px-2 py-1">
                <Text className="text-[10px] font-medium text-textSecondary">
                  Soon
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}
