import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts as useDisplayFonts,
} from '@expo-google-fonts/space-grotesk';
import React, { createContext, useContext } from 'react';

type FontsContextValue = { fontsLoaded: boolean };

const FontsContext = createContext<FontsContextValue>({ fontsLoaded: false });

export function FontsProvider({ children }: { children: React.ReactNode }) {
  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [displayLoaded] = useDisplayFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const fontsLoaded = interLoaded && displayLoaded;

  return (
    <FontsContext.Provider value={{ fontsLoaded }}>{children}</FontsContext.Provider>
  );
}

export function useFontsReady() {
  return useContext(FontsContext).fontsLoaded;
}
