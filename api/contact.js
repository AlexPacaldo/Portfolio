export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  const cleanName = String(name || '').trim().slice(0, 100);
  const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 254);
  const cleanMessage = String(message || '').trim().slice(0, 5000);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ success: false, message: 'Please fill in all the required fields.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
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
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
        html: [
          '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px">',
          `<h3 style="margin:0 0 8px">New message from <strong>${escapeHtml(cleanName)}</strong></h3>`,
          `<p style="margin:0 0 16px"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>`,
          '<hr style="border:none;border-top:1px solid #e5e7eb;margin:8px 0 16px"/>',
          `<p style="margin:0;white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>`,
          '</div>',
        ].join(''),
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}