// app/wallet.tsx
import React, { memo } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = "#F2E6B8";
const INK = "#0F172A";
const MUTED = "#6B7280";
const DIVIDER = "#D4D4D4";

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

  const goBack = () => {
    // Prefer popping to the previous screen; if user landed here directly, go to profile.
    // @ts-ignore canGoBack is available at runtime
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
      {/* Header row below the GoGreen badge */}
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
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={{ padding: 8 }}
        >
          <Ionicons name="chevron-back" size={26} color={INK} />
        </Pressable>

        <Pressable
          onPress={openRedeem}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Open Redeem"
          style={{ padding: 8, marginRight: 6 }}
        >
          <Text style={{ color: MUTED, textDecorationLine: "underline", fontSize: 14 }}>
            Redeem
          </Text>
        </Pressable>
      </View>

      {/* Coins section */}
      <View style={{ alignItems: "center", marginTop: 12 }}>
        <Ionicons name="cash-outline" size={64} color={INK} />
        <Text style={{ color: MUTED, fontSize: 16, marginTop: 8 }}>Coins</Text>
        {/* If you track a balance later, render it here */}
        {/* <Text style={{ color: INK, fontSize: 28, fontWeight: "800", marginTop: 6 }}>25</Text> */}
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
        // Prevent content from being hidden under the tab bar
        contentContainerStyle={{ paddingBottom: 88 }}
      />
    </View>
  );
}