import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { spacing } from '../../theme/typography';

type Props = {
  children: React.ReactNode;
  alternate?: boolean;
  style?: ViewStyle;
};

/** Consistent section spacing, width, and optional band background */
export function SectionContainer({ children, alternate = false, style }: Props) {
  const { theme } = useAppTheme();
  const { horizontalPadding, isMobile } = useResponsive();

  return (
    <View
      style={[
        styles.section,
        isMobile && styles.sectionMobile,
        alternate && {
          backgroundColor: theme.backgroundSecondary,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.cardBorder,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            paddingHorizontal: horizontalPadding,
            width: '100%',
            maxWidth: 1200,
            alignSelf: 'center',
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.sectionSm,
    width: '100%',
    overflow: 'hidden',
  },
  sectionMobile: {
    paddingVertical: spacing.xxl,
  },
  inner: {},
});
