export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message, captchaToken } = req.body || {};

  const cleanName = String(name || '').trim().slice(0, 100);
  const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 254);
  const cleanMessage = String(message || '').trim().slice(0, 5000);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ success: false, message: 'Please fill in all the required fields.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return res.status(500).json({ success: false, message: 'The captcha service is not configured yet.' });
  }

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: 'Please complete the captcha check.' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';

  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: captchaToken, remoteip: ip }),
    }).then((r) => r.json());

    if (!verify.success) {
      console.error('Turnstile verification failed:', verify);
      return res.status(400).json({ success: false, message: 'Captcha verification failed. Please try again.' });
    }
  } catch (err) {
    console.error('Turnstile verify request failed:', err);
    return res.status(502).json({ success: false, message: 'Unable to verify the captcha right now.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL || 'alexpacaldo1105@gmail.com';
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ success: false, message: 'The contact service is not configured yet.' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${from}>`,
        to: [to],
        reply_to: cleanEmail,
        subject: `New portfolio message from ${cleanName}`,
        text: [
          `Name: ${cleanName}`,
          `Email: ${cleanEmail}`,
          '',
          cleanMessage,
        ].join('\n'),
        html: emailTemplate(cleanName, cleanEmail, cleanMessage),
      }),
    });

    const data = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend API error:', data);
      return res.status(502).json({ success: false, message: 'Failed to send your message. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ success: false, message: 'Unexpected server error. Please try again.' });
  }
}

function emailTemplate(name, email, message) {
  return [
    '<div style="margin:0;padding:24px;background-color:#f7f7f7;font-family:Arial,Helvetica,sans-serif">',
    '  <div style="max-width:600px;margin:0 auto;overflow:hidden;border-radius:16px;border:1px solid #ececec;background-color:#ffffff">',
    '    <div style="background-color:#111827;padding:20px 24px">',
    '      <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:800">New Portfolio Message</h2>',
    '      <p style="margin:4px 0 0;color:#9ca3af;font-size:13px">Sent through the contact form</p>',
    '    </div>',
    '    <div style="padding:24px">',
    `      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#374151">`,
    `        <tr>`,
    `          <td style="padding:8px 0;width:110px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#9ca3af">Name</td>`,
    `          <td style="padding:8px 0;font-weight:600;color:#111827">${escapeHtml(name)}</td>`,
    `        </tr>`,
    `        <tr>`,
    `          <td style="padding:8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#9ca3af">Email</td>`,
    `          <td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#111827;font-weight:600">${escapeHtml(email)}</a></td>`,
    `        </tr>`,
    '      </table>',
    '      <hr style="border:none;border-top:1px solid #ececec;margin:16px 0" />',
    '      <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;color:#9ca3af">Message</p>',
    `      <div style="margin:0;white-space:pre-wrap;line-height:1.6;color:#1f2937">${escapeHtml(message)}</div>`,
    '    </div>',
    '    <div style="padding:16px 24px;background-color:#fafafa;border-top:1px solid #ececec">',
    '      <p style="margin:0;font-size:12px;color:#9ca3af">Reply directly to <strong style="color:#4b5563">this email</strong> to get back to the sender.</p>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('\n');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}