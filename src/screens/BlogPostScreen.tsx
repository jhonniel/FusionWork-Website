import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { FuturisticButton } from '../components/ui/FuturisticButton';
import { SectionContainer } from '../components/ui/SectionContainer';
import { getBlogPostById } from '../constants/blog';
import { useAppTheme } from '../context/ThemeContext';
import { getAccentColor } from '../theme/brand';
import { fonts, radius, spacing } from '../theme/typography';
import { MainRouteName, RootStackParamList } from '../navigation/types';

type Route = RouteProp<RootStackParamList, 'BlogPost'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'BlogPost'>;

export function BlogPostScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { theme } = useAppTheme();

  const post = useMemo(() => getBlogPostById(params.postId), [params.postId]);
  const accent = post ? getAccentColor(post.accent) : undefined;

  const navigate = useCallback(
    (route: string) => navigation.navigate(route as MainRouteName),
    [navigation],
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }, [navigation]);

  if (!post || !accent) {
    return (
      <ScreenWrapper currentRoute="Home" onNavigate={navigate}>
        <SectionContainer>
          <Text style={[styles.notFound, { color: theme.text }]}>Article not found.</Text>
          <FuturisticButton label="Back to Home" onPress={() => navigate('Home')} />
        </SectionContainer>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper currentRoute="Home" onNavigate={navigate}>
      <SectionContainer style={styles.hero}>
        <Pressable onPress={goBack} style={styles.backRow} accessibilityRole="button">
          <Ionicons name="arrow-back" size={20} color={theme.textMuted} />
          <Text style={[styles.backText, { color: theme.textMuted }]}>Back to articles</Text>
        </Pressable>

        <LinearGradient
          colors={[`${accent}22`, `${accent}06`]}
          style={[styles.heroBanner, { borderColor: `${accent}33` }]}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${accent}18`, borderColor: `${accent}40` }]}>
            <Ionicons name={post.icon} size={32} color={accent} />
          </View>
          <Text style={[styles.category, { color: accent }]}>{post.category}</Text>
        </LinearGradient>

        <Text style={[styles.meta, { color: theme.textSubtle }]}>
          {post.date} · {post.readTime} · {post.author}
        </Text>
        <Text style={[styles.title, { color: theme.text }]}>{post.title}</Text>
        <Text style={[styles.lead, { color: theme.textMuted }]}>{post.excerpt}</Text>
      </SectionContainer>

      <SectionContainer alternate style={styles.bodySection}>
        {post.content.map((paragraph, index) => (
          <Text
            key={index}
            style={[
              styles.paragraph,
              { color: theme.textMuted },
              index < post.content.length - 1 && styles.paragraphGap,
            ]}
          >
            {paragraph}
          </Text>
        ))}

        <View style={[styles.ctaBox, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}>
          <Text style={[styles.ctaTitle, { color: theme.text }]}>Ready to build your next product?</Text>
          <Text style={[styles.ctaText, { color: theme.textMuted }]}>
            Talk with our team about custom software, web apps, or mobile solutions for your business.
          </Text>
          <FuturisticButton
            label="Get in Touch"
            onPress={() => navigate('Contact')}
            style={{ marginTop: spacing.md }}
          />
        </View>
      </SectionContainer>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hero: { paddingTop: 8 },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
  },
  backText: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  heroBanner: {
    height: 140,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: spacing.lg,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  meta: {
    fontFamily: fonts.medium,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.6,
    marginBottom: spacing.md,
    maxWidth: 720,
  },
  lead: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 680,
  },
  bodySection: { paddingTop: spacing.xl },
  paragraph: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 720,
  },
  paragraphGap: {
    marginBottom: spacing.lg,
  },
  ctaBox: {
    marginTop: spacing.xxl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    maxWidth: 560,
  },
  ctaTitle: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: spacing.sm,
  },
  ctaText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  notFound: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    marginBottom: spacing.lg,
  },
});
