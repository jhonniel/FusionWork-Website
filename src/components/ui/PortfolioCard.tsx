import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PortfolioProject } from '../../constants/portfolio';
import { useAppTheme } from '../../context/ThemeContext';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from './GlassCard';

type Props = { project: PortfolioProject; onPress?: () => void };

export function PortfolioCard({ project, onPress }: Props) {
  const { theme } = useAppTheme();

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <GlassCard glow padding="none" style={styles.card}>
        <LinearGradient
          colors={project.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.mockUi}>
            <View style={styles.mockBar} />
            <View style={styles.mockRow}>
              <View style={[styles.mockBlock, { width: '40%' }]} />
              <View style={[styles.mockBlock, { width: '55%' }]} />
            </View>
            <View style={styles.mockRow}>
              <View style={[styles.mockBlock, { flex: 1, height: 48 }]} />
              <View style={[styles.mockBlock, { flex: 1, height: 48 }]} />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.body}>
          <Text style={[styles.category, { color: theme.gradient[1] }]}>{project.category}</Text>
          <Text style={[styles.title, { color: theme.text }]}>{project.title}</Text>
          <Text style={[styles.desc, { color: theme.textMuted }]}>{project.description}</Text>
          <View style={styles.tags}>
            {project.tech.map((t) => (
              <View key={t} style={[styles.tag, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}>
                <Text style={[styles.tagText, { color: theme.textMuted }]}>{t}</Text>
              </View>
            ))}
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minWidth: 280 },
  card: { overflow: 'hidden' },
  banner: { height: 152, padding: 18 },
  mockUi: { flex: 1, gap: 8 },
  mockBar: { height: 8, width: '30%', backgroundColor: 'rgba(255,255,255,0.45)', borderRadius: 4 },
  mockRow: { flexDirection: 'row', gap: 8 },
  mockBlock: { height: 32, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 6 },
  body: { padding: 20 },
  category: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 8,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
});
