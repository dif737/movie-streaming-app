import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        No account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  link: {
    color: '#38bdf8',
    marginTop: 15,
    textAlign: 'center',
  },
});
