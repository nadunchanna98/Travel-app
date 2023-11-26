import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, ToastAndroid } from 'react-native';
import { AuthProvider } from './src/components/AuthContext';
import AppNav from './src/components/AppNav';
import NetInfo from '@react-native-community/netinfo';

const App = () => {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {

    const unsubscribeNet = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        ToastAndroid.show('No internet connection', ToastAndroid.LONG);
        ToastAndroid.show('Please check your internet connection', ToastAndroid.LONG);
      }
    });

    return () => {
      unsubscribeNet();
    };

  }, []);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <AppNav />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;