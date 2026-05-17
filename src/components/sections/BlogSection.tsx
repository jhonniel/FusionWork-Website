import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { BLOG_POSTS } from '../../constants/blog';
import { useResponsive } from '../../hooks/useResponsive';
import { RootStackParamList } from '../../navigation/types';
import { BlogCard } from '../ui/BlogCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function BlogSection() {
  const navigation = useNavigation<Nav>();
  const { isMobile, isTablet } = useResponsive();
  const itemWidth = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  const openPost = useCallback(
    (postId: string) => {
      navigation.navigate('BlogPost', { postId });
    },
    [navigation],
  );

  return (
    <SectionContainer alternate>
      <SectionHeader
        eyebrow="Insights"
        title="From Our Blog"
        subtitle="Practical guides on software, design, and digital growth for businesses in the Philippines."
      />
      <View style={styles.grid}>
        {BLOG_POSTS.map((post) => (
          <View key={post.id} style={{ width: itemWidth, padding: 8 }}>
            <BlogCard post={post} onPress={() => openPost(post.id)} />
          </View>
        ))}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 },
});
