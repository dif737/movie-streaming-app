import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load vector icons (fixes ? instead of heart)
        await Font.loadAsync({
          ...AntDesign.font,
        });
      } catch (e) {
        console.log('Font loading error:', e);
      } finally {
        setReady(true);
      }
    };

    prepare();
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#020617',
        }}
      >
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
