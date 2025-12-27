import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => navigation.goBack()}
      >
        Already have an account?
      </Text>
    </View>
  );
}
