// src/User.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { signIn, signUp, confirmSignUp } from '../../backend/auth/cognito';
import { User } from './core/User'; 

export default function UserScreen() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'confirm'
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signIn(email.trim(), pw);
      // Pull Cognito attributes -> plain map
      const attrs = await new Promise((resolve, reject) => {
        res.user.getUserAttributes((err, list) => {
          if (err) return reject(err);
          resolve(Object.fromEntries(list.map(a => [a.getName(), a.getValue()])));
        });
      });

      // Build your app user from attributes
      const appUser = new User({
        pts: 0,
        coupon: [],
        name: attrs.name || '',
        email: email.trim(),
        username: attrs.preferred_username || email.split('@')[0],
      });

      console.log('Signed in. AppUser:', appUser.toJSON());
      Alert.alert('Success', `Welcome, ${appUser.name || appUser.username}!`);

      // TODO: navigate to home screen and/or store user in state/AsyncStorage
      // e.g., router.replace('/home') or setGlobalUser(appUser)
    } catch (e) {
      if (e?.code === 'NEW_PASSWORD_REQUIRED') {
        Alert.alert('Update password required', 'This Cognito user must set a new password.');
      } else {
        Alert.alert('Sign in failed', e?.message ?? 'Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp(email.trim(), pw, name.trim(), username.trim());
      setMode('confirm');
      Alert.alert('Check your email', 'Enter the verification code that was sent to you.');
    } catch (e) {
      Alert.alert('Sign up failed', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmSignUp(email.trim(), code.trim());
      setMode('signin');
      Alert.alert('Confirmed', 'Account verified. Please sign in.');
    } catch (e) {
      Alert.alert('Confirmation failed', e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    if (mode === 'signin') return handleSignIn();
    if (mode === 'signup') return handleSignUp();
    return handleConfirm();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F7F7F7' }}>
      <Text style={{ fontSize: 26, fontWeight: '800', marginBottom: 12 }}>
        {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Confirm Code'}
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      {(mode === 'signin' || mode === 'signup') && (
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={pw}
          onChangeText={setPw}
          style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 10 }}
        />
      )}

      {mode === 'signup' && (
        <>
          <TextInput
            placeholder="Name (optional)"
            value={name}
            onChangeText={setName}
            style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Username (optional)"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 10 }}
          />
        </>
      )}

      {mode === 'confirm' && (
        <TextInput
          placeholder="Confirmation code"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12, marginBottom: 10 }}
        />
      )}

      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={{ marginTop: 6, backgroundColor: '#111827', paddingVertical: 14, borderRadius: 12, alignItems: 'center', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? <ActivityIndicator color="white" /> : (
          <Text style={{ color: 'white', fontWeight: '700' }}>
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Confirm'}
          </Text>
        )}
      </Pressable>

      {/* Switch modes */}
      {mode !== 'confirm' ? (
        <Pressable onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', color: '#2563EB' }}>
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => setMode('signin')} style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', color: '#2563EB' }}>Back to Sign In</Text>
        </Pressable>
      )}
    </View>
  );
}
