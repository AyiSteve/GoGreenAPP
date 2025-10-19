import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#6B7280";
const DIVIDER = "#D4D4D4";

const MOCK_TXNS = [
  { id: "1", title: "Recycled bottles", amount: +10, date: "Today" },
  { id: "2", title: "Redeemed reward", amount: -5, date: "Yesterday" },
];

export default function Wallet() {
  const router = useRouter();
  const Divider = () => <View style={{ height: 1, backgroundColor: DIVIDER, marginHorizontal: 18 }} />;

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* back + Redeem link row */}
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={26} color={INK} />
        </Pressable>
        <Pressable onPress={() => router.push("/redeem")} hitSlop={10} style={{ padding: 8, marginRight: 6 }}>
          <Text style={{ color: MUTED, textDecorationLine: "underline", fontSize: 14 }}>Redeem</Text>
        </Pressable>
      </View>

      {/* Coins area */}
      <View style={{ alignItems: "center", marginTop: 12 }}>
        <Ionicons name="cash-outline" size={64} color={INK} />
        <Text style={{ color: MUTED, fontSize: 16, marginTop: 8 }}>Coins</Text>
      </View>

      {/* Divider */}
      <View style={{ marginVertical: 20 }}><Divider /></View>

      {/* Transactions */}
      <Text style={{ fontSize: 18, fontWeight: "600", color: INK, marginLeft: 20, marginBottom: 8 }}>
        Transactions:
      </Text>
      <FlatList
        data={MOCK_TXNS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: INK }}>{item.title}</Text>
            <Text style={{ color: item.amount > 0 ? "#16A34A" : "#B91C1C", fontWeight: "600" }}>
              {item.amount > 0 ? `+${item.amount}` : item.amount}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}