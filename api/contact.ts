import { Resend } from 'resend';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function thankYouHtml(name: string) {
  const safeName = escapeHtml(name);
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h1 style="font-size: 22px; margin: 0 0 12px; color: #E60000;">Thank you, ${safeName}!</h1>
      <p style="margin: 0 0 12px; color: #334155;">
        We received your message and appreciate you reaching out to <strong>FUSION WORK</strong>.
      </p>
      <p style="margin: 0 0 12px; color: #334155;">
        Our team will review your inquiry and get back to you shortly.
      </p>
      <p style="margin: 24px 0 0; color: #64748b; font-size: 14px;">
        — The FUSION WORK Team<br/>
        Davao City, Philippines
      </p>
    </div>
  `;
}

function notifyHtml(name: string, email: string, message: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">New contact form message</h1>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap; color: #334155;">${escapeHtml(message)}</p>
    </div>
  `;
}

export default async function handler(
  req: { method?: string; body?: ContactBody },
  res: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => { json: (body: unknown) => void };
  },
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).json({});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const name = String(req.body?.name ?? '').trim();
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const message = String(req.body?.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'FUSION WORK <onboarding@resend.dev>';
  const notifyTo =
    process.env.CONTACT_NOTIFY_EMAIL?.trim() || 'thefusionwork@gmail.com';

  const resend = new Resend(apiKey);

  const confirmation = await resend.emails.send({
    from,
    to: [email],
    subject: 'Thank you for contacting FUSION WORK',
    html: thankYouHtml(name),
    replyTo: notifyTo,
  });

  if (confirmation.error) {
    console.error('Resend confirmation error:', confirmation.error);
    return res.status(502).json({ error: 'Failed to send confirmation email' });
  }

  const notify = await resend.emails.send({
    from,
    to: [notifyTo],
    replyTo: email,
    subject: `New message from ${name}`,
    html: notifyHtml(name, email, message),
  });

  if (notify.error) {
    console.error('Resend notify error:', notify.error);
    // Confirmation already sent — still treat as success for the visitor
  }

  return res.status(200).json({ ok: true });
}
