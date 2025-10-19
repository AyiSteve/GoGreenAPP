// components/GoGreenHeader.tsx
import React from "react";
import { View, Text, Platform, StatusBar } from "react-native";

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
        paddingTop:
          Platform.OS === "ios"
            ? 60 // a little lower for iPhones with a notch
            : StatusBar.currentHeight
            ? StatusBar.currentHeight + 20 // Android adjusts to status bar height
            : 40,
        paddingBottom: 16, // extra bottom padding to space below logo
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.pill,
          paddingHorizontal: 22,
          paddingVertical: 10,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 3,
          elevation: 4,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>{title}</Text>
      </View>
    </View>
  );
}