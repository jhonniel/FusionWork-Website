import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { View } from 'react-native';

import type { NavRoute } from '../constants/navigation';

type ScrollSpyContextValue = {
  registerSection: (route: NavRoute, y: number) => void;
  getSectionY: (route: NavRoute) => number | undefined;
  getOrderedSections: () => { route: NavRoute; y: number }[];
  goTo: (route: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function useScrollSpy() {
  return useContext(ScrollSpyContext);
}

/** Marks a page block so the navbar can track / scroll to it. */
export function SectionSpy({
  route,
  children,
}: {
  route: NavRoute;
  children: React.ReactNode;
}) {
  const spy = useScrollSpy();

  return (
    <View
      collapsable={false}
      onLayout={(e) => {
        spy?.registerSection(route, e.nativeEvent.layout.y);
      }}
    >
      {children}
    </View>
  );
}

type ProviderProps = {
  children: React.ReactNode;
  goTo: (route: string) => void;
};

export function ScrollSpyProvider({ children, goTo }: ProviderProps) {
  const positions = useRef<Partial<Record<NavRoute, number>>>({});

  const registerSection = useCallback((route: NavRoute, y: number) => {
    const prev = positions.current[route];
    if (prev !== undefined && Math.abs(prev - y) < 1) return;
    positions.current[route] = y;
  }, []);

  const getSectionY = useCallback((route: NavRoute) => positions.current[route], []);

  const getOrderedSections = useCallback(() => {
    return (Object.entries(positions.current) as [NavRoute, number][])
      .filter(([, y]) => Number.isFinite(y))
      .sort((a, b) => a[1] - b[1])
      .map(([route, y]) => ({ route, y }));
  }, []);

  const value = useMemo(
    () => ({ registerSection, getSectionY, getOrderedSections, goTo }),
    [registerSection, getSectionY, getOrderedSections, goTo],
  );

  return <ScrollSpyContext.Provider value={value}>{children}</ScrollSpyContext.Provider>;
}
