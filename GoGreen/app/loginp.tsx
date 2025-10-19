import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { User } from "../auth/User";

export default function UserScreen() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    setTimeout(async () => {
      setLoading(false);

      // Simulate success (replace with fetch() later)
      const userData = new User({
        name,
        email,
        pw,
        username: username || email.split("@")[0],
        pts: mode === "signup" ? 100:0,
        coupon: [],
      });

  try {
        const res = await fetch("http://10.0.0.75:5002/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData.toJSON()),
        });

        if (!res.ok) throw new Error("Failed to send to server");

        Alert.alert(
          "✅ Success",
          `${mode === "signin" ? "Welcome back" : "Account created"}: ${
            userData.username
          }`
        );

        console.log("📤 Sent to server:", userData.toJSON());
      } catch (err) {
        console.error("❌ Server error:", err);
        Alert.alert("Error", "Could not reach server");
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === "signin" ? "Sign In" : "Create Account"}
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={pw}
        onChangeText={setPw}
        style={styles.input}
      />

      <Pressable onPress={handleAuth} disabled={loading} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => setMode(mode === "signin" ? "signup" : "signin")}
        style={{ marginTop: 12 }}
      >
        <Text style={styles.link}>
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F7F7F7" },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 6,
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  link: { textAlign: "center", color: "#2563EB" },
});