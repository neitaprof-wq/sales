// Vercel Serverless Function: /api/quote
// Receives quote-request submissions from the site's form and emails them
// to the lease-return / quotes inbox via the SendGrid API.
//
// Setup required (one-time, done in your own SendGrid + Vercel dashboards):
//   1. Create a free account at https://sendgrid.com
//   2. Verify a sender identity (Settings -> Sender Authentication ->
//      Single Sender Verification is the fastest way to start; a full
//      domain authentication for highvalueproductshipping.com is better
//      long-term for deliverability).
//   3. Create an API key (Settings -> API Keys -> Create API Key, "Mail
//      Send" permission is enough) and add it to this Vercel project as
//      an Environment Variable named SENDGRID_API_KEY
//      (Project Settings -> Environment Variables).
//   4. Set SENDGRID_FROM_EMAIL to the exact address you verified in step 2,
//      e.g. "copierleasereturn@highvalueproductshipping.com".
//
// Until SENDGRID_API_KEY (and SENDGRID_FROM_EMAIL) are set, submissions are
// still accepted (so the form never breaks for site visitors) and are
// written to the function logs instead of emailed.

const TO_EMAIL = 'copierleasereturn@highvalueproductshipping.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch (err) {
      body = {};
    }
  }

  const name = (body.name || '').toString().trim();
  const phone = (body.phone || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const equipmentType = (body.equipmentType || '').toString().trim();
  const fromZip = (body.fromZip || '').toString().trim();
  const toZip = (body.toZip || '').toString().trim();
  const weight = (body.weight || '').toString().trim();
  const dimensions = (body.dimensions || '').toString().trim();
  const details = (body.details || '').toString().trim();
  const comments = (body.comments || '').toString().trim();

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone are required.' });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    // No email service configured yet — accept the lead so the site keeps
    // working, and log it so it's visible in Vercel's function logs.
    console.log('New quote request (SENDGRID_API_KEY/SENDGRID_FROM_EMAIL not set):', {
      name, phone, email, equipmentType, fromZip, toZip, weight, dimensions, details, comments, receivedAt: new Date().toISOString()
    });
    res.status(200).json({
      ok: true,
      note: 'Received. Email delivery is not configured yet.'
    });
    return;
  }

  const emailBody = [
    'New quote request from usacopiermovers.com',
    '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (email || 'N/A'),
    'Shipping: ' + (equipmentType || 'N/A'),
    'From ZIP: ' + (fromZip || 'N/A'),
    'To ZIP: ' + (toZip || 'N/A'),
    'Weight: ' + (weight || 'N/A'),
    'Dimensions: ' + (dimensions || 'N/A'),
    'Equipment Details: ' + (details || 'N/A'),
    'Additional Comments: ' + (comments || 'N/A')
  ].join('\n');

  try {
    const emailRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: fromEmail, name: 'USA Copier Movers Website' },
        reply_to: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : fromEmail },
        subject: 'New Copier Shipping Quote Request - ' + name,
        content: [{ type: 'text/plain', value: emailBody }]
      })
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('SendGrid API error:', emailRes.status, errText);
      res.status(502).json({ error: 'Could not send email right now. Please call (866) 216-7742.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Server error sending email. Please call (866) 216-7742.' });
  }
};
