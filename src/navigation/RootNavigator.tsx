import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppTheme } from '../context/ThemeContext';
import { AboutScreen } from '../screens/AboutScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BlogPostScreen } from '../screens/BlogPostScreen';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { navigationLinking } from './linking';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { mode, theme } = useAppTheme();

  const navTheme = mode === 'dark'
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: theme.background,
          card: theme.background,
          text: theme.text,
          border: theme.cardBorder,
          primary: theme.gradient[0],
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.background,
          card: theme.background,
          text: theme.text,
          border: theme.cardBorder,
          primary: theme.gradient[0],
        },
      };

  return (
    <NavigationContainer linking={navigationLinking} theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Portfolio" component={PortfolioScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="BlogPost" component={BlogPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
