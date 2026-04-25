import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_BAR_HEIGHT = 82;
const FAB_SIZE = 56;
const FAB_OFFSET = 12;
const TAB_ICON_SIZE = 22;
const ACTIVE_TINT = '#16A34A';
const INACTIVE_TINT = '#94A3B8';

function getTabIconName(routeName: string, focused: boolean): React.ComponentProps<typeof Ionicons>['name'] {
  if (routeName === 'home') {
    return focused ? 'home' : 'home-outline';
  }

  if (routeName === 'reports') {
    return focused ? 'bar-chart' : 'bar-chart-outline';
  }

  return focused ? 'person' : 'person-outline';
}

function TabIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return (
    <View className="h-6 w-6 items-center justify-center">
      <Ionicons name={name} size={TAB_ICON_SIZE} color={color} />
    </View>
  );
}

function CustomTabBar({
  state,
  descriptors,
  navigation,
  onAddPress,
}: BottomTabBarProps & { onAddPress: () => void }) {
  const addRouteIndex = state.routes.findIndex((route) => route.name === 'add');
  const fabCenterPercent =
    `${((addRouteIndex + 0.5) / state.routes.length) * 100}%` as `${number}%`;

  return (
    <View
      className="border-border bg-white"
      style={{
        height: TAB_BAR_HEIGHT,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 12,
        borderTopWidth: 1,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 12,
      }}
    >
      <View className="flex-1 flex-row items-end">
        {state.routes.map((route) => {
          if (route.name === 'add') {
            return <View key={route.key} style={{ flex: 1 }} />;
          }

          const focused = state.index === state.routes.findIndex((item) => item.key === route.key);
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
                ? options.title
                : route.name;
          const color = focused ? ACTIVE_TINT : INACTIVE_TINT;
          const iconName = getTabIconName(route.name, focused);

          return (
            <View
              key={route.key}
              className="items-center justify-end"
              style={{ flex: 1 }}
            >
              <Pressable
                onPress={() => navigation.navigate(route.name)}
                className="min-h-full items-center justify-end"
                style={{ minWidth: 72 }}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
              >
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    minWidth: 40,
                    height: 28,
                    backgroundColor: focused ? '#DCFCE7' : 'transparent',
                  }}
                >
                  <TabIcon name={iconName} color={color} />
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: focused ? '700' : '500',
                    letterSpacing: 0.2,
                    color,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      <View
        className="absolute items-center"
        style={{
          bottom: FAB_OFFSET,
          left: fabCenterPercent,
          transform: [{ translateX: -FAB_SIZE / 2 }],
        }}
      >
        <Pressable
          onPress={onAddPress}
          className="items-center justify-center rounded-full bg-primary"
          style={{
            height: FAB_SIZE,
            width: FAB_SIZE,
            shadowColor: '#16A34A',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 10,
          }}
          accessibilityRole="button"
          accessibilityLabel="Create transaction"
        >
          <View
            className="items-center justify-center rounded-full border border-white/25"
            style={{ height: 44, width: 44 }}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1">
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} onAddPress={() => setOpen(true)} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reports',
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setOpen(false)}
        >
          <Pressable className="absolute bottom-28 left-4 right-4 rounded-2xl bg-white p-4">
            <Text className="mb-3 text-base font-semibold text-textPrimary">
              Create Transaction
            </Text>

            <Pressable
              onPress={() => {
                setOpen(false);
                router.push('/add-expense');
              }}
              className="mb-2 rounded-xl border border-border px-4 py-3"
            >
              <Text className="font-semibold text-textPrimary">
                Add Expense
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setOpen(false);
                router.push('/add-income');
              }}
              className="rounded-xl border border-border px-4 py-3"
            >
              <Text className="font-semibold text-textPrimary">
                Add Income
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
