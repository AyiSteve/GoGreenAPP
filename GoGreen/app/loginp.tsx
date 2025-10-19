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

// Handles sign in and sign up
export default function UserScreen() {
  // UI state
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // Ensure we got in put we wanted
    if (!email || !pw) {
      Alert.alert("Missing info", "Please enter both email and password");
      return;
    }

    // The sign in/signout button ui
    setLoading(true);

    try {
      // Build user object
      const userData = new User({
        name,
        email,
        pw,
        username: username || email.split("@")[0],
        pts: mode === "signup" ? 100 : 0,
        coupon: [],
      });
      // See if everything send ok
      //  console.log("Sending userData:", userData.toJSON());


      // Backend base URL......... two route here
      const baseURL = "http://10.0.0.75:5002";
      const url =
        mode === "signin"
          ? `${baseURL}/user/signin`
          : `${baseURL}/user/signup`;

      console.log("Sending request to:", url);

      // Send data to backend
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData.toJSON()),
      });

      // debug here well we technically didn't add pw variable to send to server gg
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${errText}`);
      }

      const result = await res.json();
      console.log("Server response:", result);
      
      // Create global user variable
      User.current = new User(result.user);
      console.log("Login in user saved: ", User.current);

      // ensure we login successfully
      Alert.alert(
        "Success",
        `${mode === "signin" ? "Welcome back" : "Account created"}: ${
          result.user?.username || userData.username
        }`
      );
    } catch (err: any) {
      console.error("Connection error:", err.message);
      
      Alert.alert("Network Error", "Unable to connect to server. Please check your Wi-Fi.");
      
    } finally {
      setLoading(false);
    }
  };

  // Style
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