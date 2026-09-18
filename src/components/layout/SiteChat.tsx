import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { COMPANY } from '../../constants/company';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import {
  answerFromWebsite,
  CHAT_QUICK_PROMPTS,
  contactApiUrl,
  isValidChatEmail,
  type LeadStep,
} from '../../lib/siteChat';
import { brand } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  suggestContact?: boolean;
  suggestLead?: boolean;
};

type LeadDraft = {
  name: string;
  email: string;
  message: string;
};

type Props = {
  onNavigate: (route: string) => void;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function SiteChat({ onNavigate }: Props) {
  const { theme } = useAppTheme();
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep | null>(null);
  const [lead, setLead] = useState<LeadDraft>({ name: '', email: '', message: '' });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: `Hi! I’m the ${COMPANY.name} assistant. I answer using only what’s on this website — services, projects, our story, and contact info.\n\nWant to send us your details? Say “send a message” and I’ll email our team for you.`,
      suggestLead: true,
    },
  ]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [messages, open]);

  const pushBot = useCallback((text: string, extras?: Partial<Message>) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: 'bot', text, ...extras },
    ]);
  }, []);

  const startLead = useCallback(() => {
    setLead({ name: '', email: '', message: '' });
    setLeadStep('name');
    pushBot(`Great — I can email your info to our team. What’s your name?\n\n(Type “cancel” anytime to stop.)`);
  }, [pushBot]);

  const submitLead = useCallback(
    async (draft: LeadDraft) => {
      setSending(true);
      pushBot('Sending your message…');
      try {
        const response = await fetch(contactApiUrl(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: draft.name.trim(),
            email: draft.email.trim(),
            message: draft.message.trim(),
            source: 'Website Chat',
          }),
        });
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          pushBot(
            payload?.error ??
              'Sorry — I couldn’t send that email right now. You can try again or use the Contact page.',
            { suggestContact: true, suggestLead: true },
          );
          setLeadStep(null);
          return;
        }

        pushBot(
          `Thanks, ${draft.name.trim()}! Your message was emailed to our team, and a confirmation was sent to ${draft.email.trim()}. We’ll get back to you shortly.`,
        );
        setLead({ name: '', email: '', message: '' });
        setLeadStep(null);
      } catch {
        pushBot(
          'Unable to reach the email service. Please check your connection, try again, or use the Contact page.',
          { suggestContact: true, suggestLead: true },
        );
        setLeadStep(null);
      } finally {
        setSending(false);
      }
    },
    [pushBot],
  );

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || sending) return;

      setMessages((prev) => [...prev, { id: uid(), role: 'user', text }]);
      setInput('');

      const lower = text.toLowerCase();
      if (leadStep && (lower === 'cancel' || lower === 'stop')) {
        setLeadStep(null);
        setLead({ name: '', email: '', message: '' });
        pushBot('Okay — cancelled. Ask me anything about FUSION WORK, or say “send a message” when you’re ready.');
        return;
      }

      if (leadStep === 'name') {
        if (text.length < 2) {
          pushBot('Please enter your name (at least 2 characters).');
          return;
        }
        setLead((prev) => ({ ...prev, name: text }));
        setLeadStep('email');
        pushBot(`Thanks, ${text}. What’s your email address?`);
        return;
      }

      if (leadStep === 'email') {
        if (!isValidChatEmail(text)) {
          pushBot('That doesn’t look like a valid email. Please enter an email like you@company.com.');
          return;
        }
        setLead((prev) => ({ ...prev, email: text }));
        setLeadStep('message');
        pushBot('Got it. What message or project details should I send to the team?');
        return;
      }

      if (leadStep === 'message') {
        if (text.length < 5) {
          pushBot('Please share a bit more detail so our team can help (at least a short sentence).');
          return;
        }
        const draft = { ...lead, message: text };
        setLead(draft);
        await submitLead(draft);
        return;
      }

      const reply = answerFromWebsite(text);
      if (reply.startLeadCapture) {
        setLead({ name: '', email: '', message: '' });
        setLeadStep('name');
      }
      pushBot(reply.text, {
        suggestContact: reply.suggestContact,
        suggestLead: reply.suggestLead,
      });
    },
    [lead, leadStep, pushBot, sending, submitLead],
  );

  const panelStyle = [
    styles.panel,
    {
      backgroundColor: theme.surface,
      borderColor: theme.cardBorder,
      width: isMobile ? ('100%' as const) : 360,
      maxWidth: isMobile ? 420 : 360,
      right: isMobile ? 12 : 20,
      left: isMobile ? 12 : undefined,
      bottom: isMobile ? 76 : 88,
    },
  ];

  const placeholder = leadStep
    ? leadStep === 'name'
      ? 'Your name…'
      : leadStep === 'email'
        ? 'Your email…'
        : 'Your message…'
    : 'Ask about FUSION WORK…';

  return (
    <View pointerEvents="box-none" style={styles.host}>
      {open ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={panelStyle}
        >
          <View style={[styles.header, { borderBottomColor: theme.cardBorder, backgroundColor: brand.red }]}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{COMPANY.name} Chat</Text>
            </View>
            <Pressable
              onPress={() => setOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Close chat"
              hitSlop={10}
            >
              <Ionicons name="close" size={22} color="#fff" />
            </Pressable>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.messages}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((m) => (
              <View
                key={m.id}
                style={[
                  styles.bubble,
                  m.role === 'user'
                    ? [styles.userBubble, { backgroundColor: brand.red }]
                    : [
                        styles.botBubble,
                        { backgroundColor: theme.backgroundSecondary, borderColor: theme.cardBorder },
                      ],
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    { color: m.role === 'user' ? '#fff' : theme.text },
                  ]}
                >
                  {m.text}
                </Text>
                {m.role === 'bot' && m.suggestLead ? (
                  <Pressable
                    onPress={startLead}
                    disabled={sending || !!leadStep}
                    style={[
                      styles.contactBtn,
                      { backgroundColor: `${brand.red}18`, borderColor: `${brand.red}55` },
                    ]}
                  >
                    <Text style={[styles.contactBtnText, { color: brand.red }]}>Send a message</Text>
                  </Pressable>
                ) : null}
                {m.role === 'bot' && m.suggestContact ? (
                  <Pressable
                    onPress={() => {
                      setOpen(false);
                      onNavigate('Contact');
                    }}
                    style={[
                      styles.contactBtn,
                      { backgroundColor: theme.background, borderColor: theme.cardBorder },
                    ]}
                  >
                    <Text style={[styles.contactBtnText, { color: theme.text }]}>Go to Contact</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </ScrollView>

          {!leadStep ? (
            <View style={styles.quickRow}>
              {CHAT_QUICK_PROMPTS.map((prompt) => (
                <Pressable
                  key={prompt}
                  onPress={() => send(prompt)}
                  disabled={sending}
                  style={[
                    styles.quickChip,
                    { borderColor: theme.cardBorder, backgroundColor: theme.background },
                  ]}
                >
                  <Text style={[styles.quickChipText, { color: theme.textMuted }]} numberOfLines={1}>
                    {prompt}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          <View style={[styles.composer, { borderTopColor: theme.cardBorder }]}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={placeholder}
              placeholderTextColor={theme.textSubtle}
              editable={!sending}
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.cardBorder,
                  backgroundColor: theme.background,
                  fontFamily: fonts.regular,
                },
              ]}
              onSubmitEditing={() => send(input)}
              returnKeyType="send"
              keyboardType={leadStep === 'email' ? 'email-address' : 'default'}
              autoCapitalize={leadStep === 'email' ? 'none' : 'sentences'}
            />
            <Pressable
              onPress={() => send(input)}
              style={[
                styles.sendBtn,
                { backgroundColor: brand.red, opacity: input.trim() && !sending ? 1 : 0.5 },
              ]}
              disabled={!input.trim() || sending}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Ionicons name="send" size={18} color="#fff" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      ) : null}

      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={[
          styles.fab,
          { backgroundColor: brand.red, bottom: isMobile ? 16 : 24, right: isMobile ? 16 : 24 },
        ]}
        accessibilityRole="button"
        accessibilityLabel={open ? 'Close chat' : 'Open chat'}
      >
        <Ionicons name={open ? 'close' : 'chatbubbles'} size={26} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    elevation: 50,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: brand.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  panel: {
    position: 'absolute',
    height: 480,
    maxHeight: '70%',
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  headerText: { flex: 1, paddingRight: 8 },
  headerTitle: {
    color: '#fff',
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  messages: { flex: 1 },
  messagesContent: {
    padding: 12,
    gap: 10,
  },
  bubble: {
    maxWidth: '92%',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  botBubble: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  bubbleText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  contactBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  contactBtnText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  quickChip: {
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    maxWidth: '100%',
  },
  quickChipText: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'web' ? 10 : 8,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
