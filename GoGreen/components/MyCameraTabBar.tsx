import React from "react";
import { View, Pressable, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const { width: W } = Dimensions.get("window");

export default function MyCameraTabBar({ navigation, state }: BottomTabBarProps) {
  // Oversize the dock to create a smooth, wide curve
  const DOCK_WIDTH = W * 1.2;
  const DOCK_HEIGHT = 180;
  const DOCK_RADIUS = DOCK_WIDTH;
  const left = -(DOCK_WIDTH - W) / 2;

  const focused = (name: string) => state.routes[state.index].name === name;

  return (
    <View pointerEvents="box-none" style={{ height: DOCK_HEIGHT / 2 }}>
      {/* Curved grey dock */}
      <View
        style={{
          position: "absolute",
          left,
          bottom: 0,
          width: DOCK_WIDTH,
          height: DOCK_HEIGHT,
          backgroundColor: "#E4E5E7",
          borderTopLeftRadius: DOCK_RADIUS,
          borderTopRightRadius: DOCK_RADIUS,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -3 },
          elevation: 6,
        }}
      />

      {/* Left button: Camera */}
      <Pressable
        onPress={() => navigation.navigate("camera")}
        style={{
          position: "absolute",
          left: 60,
          bottom: 24,
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
        hitSlop={10}
      >
        <Ionicons
          name={focused("camera") ? "camera" : "camera-outline"}
          size={32}
          color={focused("camera") ? "#16A34A" : "#0F172A"}
        />
      </Pressable>

      {/* Right button: Profile */}
      <Pressable
        onPress={() => navigation.navigate("profile")}
        style={{
          position: "absolute",
          right: 60,
          bottom: 24,
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
        hitSlop={10}
      >
        <Ionicons
          name={focused("profile") ? "person" : "person-outline"}
          size={32}
          color={focused("profile") ? "#16A34A" : "#0F172A"}
        />
      </Pressable>

      {/* safe-area spacer */}
      <View style={{ height: Platform.select({ ios: 8, android: 4 }) }} />
    </View>
  );
}
