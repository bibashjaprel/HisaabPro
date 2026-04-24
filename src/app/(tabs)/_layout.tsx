import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#16A34A',
          tabBarInactiveTintColor: '#6B7280',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarStyle: {
            height: 72,
            paddingBottom: 10,
            paddingTop: 8,
            paddingHorizontal: 6,
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: '',
            tabBarButton: () => <View style={{ width: 84 }} />,
          }}
        />

        <Tabs.Screen
          name="reports"
          options={{
            title: 'Reports',
            tabBarIcon: ({ color }) => (
              <Ionicons name="bar-chart" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      <View className="absolute bottom-8 left-0 right-0 items-center">
        <Pressable
          onPress={() => setOpen(true)}
          className="h-16 w-16 items-center justify-center rounded-full bg-primary shadow-soft"
        >
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </Pressable>
      </View>

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
