import { useCallback, useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';

type Options = {
  threshold?: number;
  rootMargin?: string;
};

/** Fires once when the view enters the viewport (IntersectionObserver on web). */
export function useInView(onEnter: () => void, options?: Options) {
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  const hasEntered = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearObservers = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (fallbackTimer.current) {
      clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearObservers(), [clearObservers]);

  const setRef = useCallback(
    (node: View | null) => {
      clearObservers();
      hasEntered.current = false;

      if (!node) return;

      const fire = () => {
        if (hasEntered.current) return;
        hasEntered.current = true;
        onEnterRef.current();
      };

      if (Platform.OS === 'web' && typeof IntersectionObserver !== 'undefined') {
        const element = node as unknown as Element;
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              fire();
              observer.disconnect();
            }
          },
          {
            threshold: options?.threshold ?? 0.2,
            rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
          },
        );
        observer.observe(element);
        observerRef.current = observer;
        return;
      }

      fallbackTimer.current = setTimeout(fire, 400);
    },
    [clearObservers, options?.rootMargin, options?.threshold],
  );

  return setRef;
}
