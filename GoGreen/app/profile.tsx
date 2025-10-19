import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#9CA3AF";
const DIVIDER = "#D4D4D4";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setUsername(null), []); // placeholder

  const Divider = () => (
    <View style={{ height: 1, backgroundColor: DIVIDER, marginHorizontal: 18 }} />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }} contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}>
      {/* avatar + username */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24 }}>
        <View style={{ width: 88, height: 88, borderRadius: 44, borderWidth: 2, borderColor: INK, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="aperture-outline" size={40} color={INK} />
        </View>
        <View style={{ marginLeft: 24 }}>
          <Text style={{ fontSize: 16, color: MUTED, marginBottom: 6 }}>username</Text>
          {loading ? (
            <ActivityIndicator size="small" color={INK} />
          ) : (
            <Text style={{ fontSize: 18, color: INK, fontWeight: "600" }}>{username ?? "Guest"}</Text>
          )}
        </View>
      </View>

      <View style={{ height: 24 }} />
      <Divider />
      <View style={{ height: 56 }} />

      {/* Wallet → /wallet */}
      <Pressable
        onPress={() => router.push("/wallet")}
        style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, paddingVertical: 16 }}
      >
        <Ionicons name="wallet-outline" size={48} color={INK} />
        <Text style={{ marginLeft: 12, fontSize: 18, color: INK }}>Wallet</Text>
      </Pressable>

      <View style={{ height: 24 }} />
      <Divider />

      {/* Settings */}
      <Pressable
        onPress={() => router.push("/settings")}  // was /profile
        style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, paddingVertical: 24 }}
        hitSlop={10}
      >
        <Ionicons name="settings-outline" size={48} color={INK} />
        <Text style={{ marginLeft: 12, fontSize: 18, color: INK }}>Settings</Text>
      </Pressable>
    </ScrollView>
  );
}