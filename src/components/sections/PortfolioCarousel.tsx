import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PORTFOLIO, PortfolioProject } from '../../constants/portfolio';
import { useResponsive } from '../../hooks/useResponsive';
import { PortfolioCard } from '../ui/PortfolioCard';

const AUTO_PLAY_MS = 4000;
const CARD_HEIGHT = 400;
const GAP = 16;
const SIDE_SCALE = 0.88;
const SLIDE_MS = 450;
const SLIDE_EASE = Easing.inOut(Easing.cubic);

type SlideCardProps = {
  index: number;
  project: PortfolioProject;
  slotWidth: number;
  step: number;
  translateX: SharedValue<number>;
  viewportWidth: number;
};

function SlideCard({ index, project, slotWidth, step, translateX, viewportWidth }: SlideCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const itemCenter = index * step + slotWidth / 2;
    const viewportCenter = -translateX.value + viewportWidth / 2;
    const distance = Math.abs(itemCenter - viewportCenter) / step;

    const scale = interpolate(distance, [0, 1], [1, SIDE_SCALE], Extrapolation.CLAMP);
    const opacity = interpolate(distance, [0, 1], [1, 0.88], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[{ width: slotWidth, marginRight: GAP, height: CARD_HEIGHT }, animatedStyle]}>
      <PortfolioCard project={project} />
    </Animated.View>
  );
}

export function PortfolioCarousel() {
  const { isMobile } = useResponsive();
  const [containerWidth, setContainerWidth] = useState(0);

  const items = PORTFOLIO;
  const count = items.length;
  const startIndex = count;

  const loopData = useMemo(() => [...items, ...items, ...items], [items]);

  const slotWidth = useMemo(() => {
    if (containerWidth <= 0) return 300;
    if (isMobile) return Math.min(containerWidth - 32, 360);
    return Math.floor((containerWidth - GAP * 2) / 3);
  }, [containerWidth, isMobile]);

  const step = slotWidth + GAP;
  const translateX = useSharedValue(0);
  const logicalIndexRef = useRef(startIndex);
  const isAnimating = useRef(false);

  const offsetForIndex = useCallback(
    (index: number) => {
      if (isMobile) {
        return -index * step + (containerWidth - slotWidth) / 2;
      }
      return -(index - 1) * step;
    },
    [containerWidth, isMobile, slotWidth, step],
  );

  const slideTo = useCallback(
    (index: number, animated: boolean) => {
      if (containerWidth <= 0 || step <= 0) return;

      const applyOffset = (targetIndex: number, shouldAnimate: boolean) => {
        logicalIndexRef.current = targetIndex;
        const x = offsetForIndex(targetIndex);
        if (shouldAnimate) {
          isAnimating.current = true;
          translateX.value = withTiming(x, { duration: SLIDE_MS, easing: SLIDE_EASE });
          setTimeout(() => {
            isAnimating.current = false;
          }, SLIDE_MS + 40);
        } else {
          translateX.value = x;
        }
      };

      if (index < count) {
        applyOffset(index + count, false);
        return;
      }

      if (index >= count * 2) {
        const reset = index - count;
        if (animated) {
          isAnimating.current = true;
          translateX.value = withTiming(offsetForIndex(index), { duration: SLIDE_MS, easing: SLIDE_EASE });
          setTimeout(() => {
            applyOffset(reset, false);
            isAnimating.current = false;
          }, SLIDE_MS + 40);
        } else {
          applyOffset(reset, false);
        }
        return;
      }

      applyOffset(index, animated);
    },
    [containerWidth, count, offsetForIndex, step, translateX],
  );

  useEffect(() => {
    if (containerWidth <= 0) return;
    slideTo(startIndex, false);
  }, [containerWidth, slideTo, startIndex]);

  useEffect(() => {
    if (containerWidth <= 0) return;
    const timer = setInterval(() => {
      if (isAnimating.current) return;
      slideTo(logicalIndexRef.current + 1, true);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [containerWidth, slideTo]);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width);
    if (w > 0 && w !== containerWidth) setContainerWidth(w);
  };

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.wrap} onLayout={onContainerLayout}>
      {containerWidth > 0 ? (
        <View style={[styles.viewport, { width: containerWidth }]}>
          <Animated.View style={[styles.row, rowStyle]}>
            {loopData.map((project, index) => (
              <SlideCard
                key={`${project.id}-${index}`}
                index={index}
                project={project}
                slotWidth={slotWidth}
                step={step}
                translateX={translateX}
                viewportWidth={containerWidth}
              />
            ))}
          </Animated.View>
        </View>
      ) : (
        <View style={[styles.placeholder, { height: CARD_HEIGHT }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
  },
  viewport: {
    overflow: 'hidden',
    height: CARD_HEIGHT + 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
  },
});
