import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Testimonial } from '../../constants/testimonials';
import { useAppTheme } from '../../context/ThemeContext';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from './GlassCard';

type Props = { testimonial: Testimonial };

export function TestimonialCard({ testimonial }: Props) {
  const { theme } = useAppTheme();

  return (
    <GlassCard style={styles.card}>
      <Ionicons name="chatbox-ellipses-outline" size={28} color={`${theme.gradient[0]}55`} style={styles.quoteIcon} />
      <View style={styles.stars}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Ionicons key={i} name="star" size={14} color="#fbbf24" />
        ))}
      </View>
      <Text style={[styles.quote, { color: theme.text }]}>"{testimonial.quote}"</Text>
      <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
      <View style={styles.author}>
        <LinearGradientAvatar name={testimonial.name} colors={theme.gradient} />
        <View>
          <Text style={[styles.name, { color: theme.text }]}>{testimonial.name}</Text>
          <Text style={[styles.role, { color: theme.textMuted }]}>
            {testimonial.role} · {testimonial.company}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

function LinearGradientAvatar({
  name,
  colors,
}: {
  name: string;
  colors: readonly [string, string, string];
}) {
  return (
    <LinearGradient colors={[colors[0], colors[1]]} style={styles.avatar}>
      <Text style={styles.avatarText}>{name.charAt(0)}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 280 },
  quoteIcon: { marginBottom: 8 },
  stars: { flexDirection: 'row', gap: 3, marginBottom: 12 },
  quote: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
  },
  divider: { height: 1, marginBottom: 16 },
  author: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 17,
  },
  name: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  role: {
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: 2,
  },
});
