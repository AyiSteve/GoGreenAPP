import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GoGreenHeader from "../components/GoGreenHeader";

export default function RootTabs() {
  return (
    <Tabs
      initialRouteName="camera"
      screenOptions={{
        header: () => <GoGreenHeader />,
        tabBarActiveTintColor: "#16A34A",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { backgroundColor: "#fff" },
        sceneStyle: { backgroundColor: "#F2E6B8" },
      }}
    >
      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      {/* Hidden pages */}
      <Tabs.Screen name="wallet" options={{ href: null }} />
      <Tabs.Screen name="redeem" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}