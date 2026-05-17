import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

import { useAppTheme } from '../../context/ThemeContext';

/** Subtle blueprint grid for hero / premium sections */
export function GridOverlay({ opacity = 0.04 }: { opacity?: number }) {
  const { theme, mode } = useAppTheme();
  const stroke = mode === 'dark' ? `rgba(148, 163, 184, ${opacity})` : `rgba(71, 85, 105, ${opacity * 1.5})`;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <Pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <Line x1="48" y1="0" x2="48" y2="48" stroke={stroke} strokeWidth="1" />
            <Line x1="0" y1="48" x2="48" y2="48" stroke={stroke} strokeWidth="1" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>
    </View>
  );
}
