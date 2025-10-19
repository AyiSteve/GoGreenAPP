import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#6B7280";

export default function Redeem() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: BG, padding: 20 }}>
      {/* Back */}
      <Pressable onPress={() => router.back()} hitSlop={10}>
        <Ionicons name="chevron-back" size={28} color={INK} />
      </Pressable>

      <Text style={{ fontSize: 24, fontWeight: "700", color: INK, marginTop: 20 }}>Redeem Rewards</Text>
      <Text style={{ color: MUTED, marginTop: 8 }}>Choose an item below to redeem your eco-points:</Text>

      {/* Example reward */}
      <Pressable
        onPress={() => Alert.alert("Redeemed!", "You redeemed a coffee coupon ☕")}
        style={{ marginTop: 24, backgroundColor: "#fff", borderRadius: 12, padding: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500", color: INK }}>Coffee Coupon</Text>
        <Text style={{ color: MUTED, marginTop: 4 }}>Cost: 10 coins</Text>
      </Pressable>
    </View>
  );
}