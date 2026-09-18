import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

/** Web-only cursor glow follower */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (Platform.OS !== 'web' || !visible) return null;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.glow,
        {
          left: pos.x - 120,
          top: pos.y - 120,
        },
        Platform.OS === 'web' ? styles.glowWeb : null,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(230, 0, 0, 0.14)',
    zIndex: 0,
  },
  glowWeb: {
    position: 'fixed' as 'absolute',
    opacity: 0.85,
  },
});
