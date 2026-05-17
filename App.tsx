import './global.css';

import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoadingScreen } from './src/components/layout/LoadingScreen';
import { FontsProvider, useFontsReady } from './src/context/FontsContext';
import { ThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppContent() {
  const { theme, isReady } = useAppTheme();
  const fontsLoaded = useFontsReady();
  const [showSplash, setShowSplash] = useState(true);

  const finishSplash = useCallback(() => setShowSplash(false), []);

  if (!isReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.gradient[0]} />
      </View>
    );
  }

  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar style={theme.statusBar} />
        <LoadingScreen onFinish={finishSplash} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FontsProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </FontsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
