import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020617' }}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
