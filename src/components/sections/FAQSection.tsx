import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';

import { FAQ_ITEMS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { fonts, radius } from '../../theme/typography';
import { GlassCard } from '../ui/GlassCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function FAQSection() {
  const { theme } = useAppTheme();
  const [openId, setOpenId] = useState<number | null>(0);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === index ? null : index);
  };

  return (
    <SectionContainer>
      <SectionHeader eyebrow="FAQ" title="Common Questions" />
      <View style={styles.list}>
        {FAQ_ITEMS.map((item, index) => {
          const open = openId === index;
          return (
            <Pressable key={item.question} onPress={() => toggle(index)}>
              <GlassCard style={styles.item}>
                <View style={styles.row}>
                  <Text style={[styles.q, { color: theme.text }]}>{item.question}</Text>
                  <View style={[styles.chevron, { backgroundColor: `${theme.gradient[0]}15` }]}>
                    <Ionicons
                      name={open ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={theme.gradient[0]}
                    />
                  </View>
                </View>
                {open ? (
                  <Text
                    style={[
                      styles.a,
                      { color: theme.textMuted, borderTopColor: theme.cardBorder },
                    ]}
                  >
                    {item.answer}
                  </Text>
                ) : null}
              </GlassCard>
            </Pressable>
          );
        })}
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  list: { gap: 10, maxWidth: 720, alignSelf: 'center', width: '100%' },
  item: { marginBottom: 0 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  q: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  a: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
