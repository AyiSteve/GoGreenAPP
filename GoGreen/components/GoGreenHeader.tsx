import React from "react";
import { View, Text } from "react-native";

export default function GoGreenHeader({
  title = "GoGreen",
  colors = { pill: "#8ED168", bg: "#F2E6B8" },
}: {
  title?: string;
  colors?: { pill: string; bg: string };
}) {
  return (
    <View
      style={{
        backgroundColor: colors.bg,
        paddingTop: 40,   // lowered a bit per your request
        paddingBottom: 12,
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.pill,
          paddingHorizontal: 18,
          paddingVertical: 8,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>{title}</Text>
      </View>
    </View>
  );
}
