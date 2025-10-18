import { View, Text, StyleSheet } from 'react-native';

export default function RedeemScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Redeem</Text>
      <Text style={styles.subtitle}>Exchange your eco-points for rewards!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555' },
});