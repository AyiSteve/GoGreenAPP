// app/settings.tsx
import React from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#6B7280";
const DIVIDER = "#D4D4D4";
const DANGER = "#EF4444";

function Row({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, paddingVertical: 18 }}
    >
      <Ionicons name={icon} size={28} color={danger ? DANGER : INK} />
      <Text
        style={{
          marginLeft: 14,
          fontSize: 20,
          color: danger ? DANGER : INK,
          fontWeight: danger ? "700" : "500",
          textShadowColor: "rgba(0,0,0,0.15)",
          textShadowRadius: 2,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const Divider = () => (
  <View style={{ height: 1, backgroundColor: DIVIDER, marginLeft: 24, marginRight: 24 }} />
);

export default function Settings() {
  const router = useRouter();
  const goBack = () => {
    // @ts-ignore
    if (router.canGoBack?.()) router.back();
    else router.replace("/profile");
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* back arrow row (beneath your GoGreen header) */}
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 6 }}>
        <Pressable onPress={goBack} hitSlop={10} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={26} color={INK} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Address */}
        <Row icon="mail-outline" label="Address" onPress={() => Alert.alert("Address", "Open address form")} />
        <Divider />

        {/* Legal */}
        <Row icon="podium-outline" label="Legal" onPress={() => Alert.alert("Legal", "Open legal docs")} />
        <Divider />

        {/* Help */}
        <Row icon="help-circle-outline" label="Help" onPress={() => Alert.alert("Help", "Open help center")} />
        <Divider />

        {/* Privacy */}
        <Row icon="eye-outline" label="Privacy" onPress={() => Alert.alert("Privacy", "Open privacy settings")} />

        {/* Log Out */}
        <View style={{ height: 24 }} />
        <Row
          icon="log-out-outline"
          label="Log Out"
          danger
          onPress={() => Alert.alert("Log Out", "Implement your sign-out here")}
        />
      </ScrollView>
    </View>
  );
}