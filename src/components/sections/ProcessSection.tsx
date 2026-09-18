import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { PROCESS_STEPS } from '../../constants/landing';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { getAccentColor } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

function ProcessStepItem({
  step,
  title,
  description,
  icon,
  accent,
  index,
  stacked,
  isLast,
}: (typeof PROCESS_STEPS)[number] & {
  index: number;
  stacked: boolean;
  isLast: boolean;
}) {
  const { theme } = useAppTheme();
  const color = getAccentColor(accent);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withDelay(
      index * 90,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      index * 90,
      withTiming(0, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
  }, [index, opacity, translateY]);

  const anim = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!stacked) {
    return (
      <Animated.View style={[styles.stepFlat, anim]}>
        <View style={[styles.stepBadge, { backgroundColor: `${color}18`, borderColor: `${color}44` }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.stepNum, { color }]}>{step}</Text>
        <Text style={[styles.stepTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.stepDesc, { color: theme.textMuted }]}>{description}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.step, anim]}>
      <View style={styles.stepRail}>
        <View style={[styles.stepBadge, { backgroundColor: `${color}18`, borderColor: `${color}44` }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        {!isLast ? <View style={[styles.connector, { backgroundColor: theme.cardBorder }]} /> : null}
      </View>
      <View style={styles.stepBody}>
        <Text style={[styles.stepNum, { color }]}>{step}</Text>
        <Text style={[styles.stepTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.stepDesc, { color: theme.textMuted }]}>{description}</Text>
      </View>
    </Animated.View>
  );
}

export function ProcessSection() {
  const { isDesktop, isTablet } = useResponsive();
  const stacked = !(isDesktop || isTablet);

  return (
    <SectionContainer>
      <SectionHeader
        eyebrow="How We Work"
        title="From Idea to Impact"
        subtitle="A clear process that keeps scope honest, communication open, and delivery on track."
      />
      <View style={[styles.track, !stacked && styles.trackRow]}>
        {PROCESS_STEPS.map((item, index) => (
          <View key={item.id} style={stacked ? styles.stepColStacked : styles.stepCol}>
            <ProcessStepItem
              {...item}
              index={index}
              stacked={stacked}
              isLast={index === PROCESS_STEPS.length - 1}
            />
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    gap: 4,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepCol: {
    flex: 1,
    minWidth: 0,
  },
  stepColStacked: {
    width: '100%',
  },
  stepFlat: {
    gap: 10,
    paddingVertical: 8,
  },
  step: {
    flexDirection: 'row',
    gap: 16,
  },
  stepRail: {
    alignItems: 'center',
    width: 48,
  },
  stepBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 40,
    marginTop: 8,
    borderRadius: 1,
  },
  stepBody: {
    flex: 1,
    paddingBottom: 24,
    minWidth: 0,
  },
  stepNum: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.4,
  },
  stepTitle: {
    fontFamily: fonts.displaySemibold,
    fontSize: 20,
    letterSpacing: -0.3,
  },
  stepDesc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
  },
});
