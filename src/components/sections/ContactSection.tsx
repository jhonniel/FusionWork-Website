import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COMPANY } from '../../constants/company';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { fonts, radius, spacing } from '../../theme/typography';
import { FuturisticButton } from '../ui/FuturisticButton';
import { GlassCard } from '../ui/GlassCard';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';

export function ContactSection({ fullPage = false }: { fullPage?: boolean }) {
  const { theme } = useAppTheme();
  const { isDesktop } = useResponsive();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields before sending.');
      return;
    }
    Alert.alert('Message sent', 'Thank you! Our team will get back to you shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const inputStyle = (field: string) => [
    styles.input,
    {
      color: theme.text,
      borderColor: focused === field ? theme.accent : theme.cardBorder,
      backgroundColor: theme.surface,
      fontFamily: fonts.regular,
    },
    focused === field && styles.inputFocused,
  ];

  return (
    <SectionContainer alternate={!fullPage}>
      <SectionHeader
        eyebrow="Contact"
        title={fullPage ? "Let's Build Together" : 'Get In Touch'}
        subtitle="Ready to start your next project? Reach out and let's discuss your vision."
      />

      <View style={[styles.grid, isDesktop && { flexDirection: 'row', alignItems: 'flex-start' }]}>
        <GlassCard glow style={{ flex: isDesktop ? 1.15 : undefined }}>
          <Text style={[styles.formTitle, { color: theme.text }]}>Send a message</Text>
          <Text style={[styles.label, { color: theme.textMuted }]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder="Your name"
            placeholderTextColor={theme.textSubtle}
            style={inputStyle('name')}
          />
          <Text style={[styles.label, { color: theme.textMuted }]}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="you@company.com"
            placeholderTextColor={theme.textSubtle}
            keyboardType="email-address"
            autoCapitalize="none"
            style={inputStyle('email')}
          />
          <Text style={[styles.label, { color: theme.textMuted }]}>Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            placeholder="Tell us about your project..."
            placeholderTextColor={theme.textSubtle}
            multiline
            numberOfLines={4}
            style={[...inputStyle('message'), styles.textarea]}
          />
          <FuturisticButton label="Send Message" onPress={submit} fullWidth style={{ marginTop: spacing.md }} />
        </GlassCard>

        <View style={[styles.side, { flex: 1 }]}>
          {[
            { icon: 'call-outline' as const, title: 'Phone', value: COMPANY.phone, color: 0 },
            { icon: 'location-outline' as const, title: 'Location', value: COMPANY.location, color: 1 },
          ].map((item) => (
            <GlassCard key={item.title} style={styles.infoCard}>
              <View style={[styles.infoIcon, { backgroundColor: `${theme.gradient[item.color]}15` }]}>
                <Ionicons name={item.icon} size={20} color={theme.gradient[item.color]} />
              </View>
              <View>
                <Text style={[styles.infoTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.infoText, { color: theme.textMuted }]}>{item.value}</Text>
              </View>
            </GlassCard>
          ))}

          <GlassCard style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: `${theme.gradient[2]}15` }]}>
              <Ionicons name="logo-facebook" size={20} color={theme.gradient[2]} />
            </View>
            <View>
              <Text style={[styles.infoTitle, { color: theme.text }]}>Facebook</Text>
              <Text
                style={[styles.link, { color: theme.gradient[0] }]}
                onPress={() => Linking.openURL(COMPANY.facebook)}
              >
                @thefusionwork
              </Text>
            </View>
          </GlassCard>

          <View style={[styles.map, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}>
            <Ionicons name="map-outline" size={32} color={theme.textSubtle} />
            <Text style={[styles.mapText, { color: theme.text }]}>Davao City, Philippines</Text>
            <Text style={[styles.mapSub, { color: theme.textSubtle }]}>Map integration coming soon</Text>
          </View>
        </View>
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 20 },
  formTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'web' ? 13 : 11,
    fontSize: 15,
  },
  inputFocused: {
    shadowColor: '#E60000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  textarea: { minHeight: 110, textAlignVertical: 'top' },
  side: { gap: 12 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    marginBottom: 2,
  },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  link: {
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 2,
  },
  map: {
    borderWidth: 1,
    borderRadius: radius.lg,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  mapText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  mapSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
