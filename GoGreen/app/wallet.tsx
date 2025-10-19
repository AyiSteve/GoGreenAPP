import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#6B7280";
const DIVIDER = "#D4D4D4";

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

type Txn = { id: string; title: string; amount: number; date: string };

const MOCK_TXNS: Txn[] = [
  { id: "1", title: "Recycled bottles", amount: +10, date: "Today" },
  { id: "2", title: "Redeemed reward", amount: -5, date: "Yesterday" },
];

const Divider = memo(() => (
  <View style={{ height: 1, backgroundColor: DIVIDER, marginHorizontal: 18 }} />
));

export default function Wallet() {
  const router = useRouter();

  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load points from backend JSON
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/me`);
        if (!res.ok) throw new Error("Failed to fetch points");
        const data = await res.json();
        setPoints(typeof data.points === "number" ? data.points : 0);
      } catch (e) {
        console.warn("Points fetch failed, using fallback 0.");
        setPoints(0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const goBack = () => {
    // @ts-ignore
    if (router.canGoBack?.()) router.back();
    else router.replace("/profile");
  };

  const openRedeem = () => router.push("/redeem");

  const renderTxn = ({ item }: { item: Txn }) => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: INK, fontSize: 16 }}>{item.title}</Text>
        <Text style={{ color: MUTED, fontSize: 12, marginTop: 2 }}>{item.date}</Text>
      </View>
      <Text
        style={{
          color: item.amount > 0 ? "#16A34A" : "#B91C1C",
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        {item.amount > 0 ? `+${item.amount}` : item.amount}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      {/* Header row */}
      <View
        style={{
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 6,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={goBack}
          hitSlop={10}
          style={{ padding: 8 }}
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={26} color={INK} />
        </Pressable>

        <Pressable
          onPress={openRedeem}
          hitSlop={10}
          style={{ padding: 8, marginRight: 6 }}
        >
          <Text style={{ color: MUTED, textDecorationLine: "underline", fontSize: 14 }}>
            Redeem
          </Text>
        </Pressable>
      </View>

      {/* Coins row */}
      <View style={{ marginTop: 12, paddingHorizontal: 20, flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="cash-outline" size={36} color={INK} />
        <Text style={{ color: MUTED, fontSize: 16, marginLeft: 10 }}>Coins</Text>
        <View style={{ marginLeft: 12, flexDirection: "row", alignItems: "center" }}>
          {loading ? (
            <ActivityIndicator size="small" color={INK} />
          ) : (
            <Text style={{ color: INK, fontSize: 24, fontWeight: "800" }}>
              {points ?? 0}
            </Text>
          )}
        </View>
      </View>

      {/* Divider + Transactions header */}
      <View style={{ marginVertical: 20 }}>
        <Divider />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: INK,
          marginLeft: 20,
          marginBottom: 8,
        }}
      >
        Transactions:
      </Text>

      {/* Transactions list */}
      <FlatList
        data={MOCK_TXNS}
        keyExtractor={(item) => item.id}
        renderItem={renderTxn}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <Text style={{ color: MUTED, textAlign: "center", marginTop: 20 }}>
            No transactions yet.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 88 }}
      />
    </View>
  );
}