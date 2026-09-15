// Vercel Serverless Function: /api/quote
// Receives quote-request submissions from the site's form and emails them
// to the lease-return / quotes inbox via the Resend API.
//
// Setup required (one-time, done in the Vercel dashboard by the project owner):
//   1. Create a free account at https://resend.com
//   2. Verify a sending domain (or use the resend.dev test sender to start)
//   3. Create an API key and add it to this project as an Environment
//      Variable named RESEND_API_KEY (Project Settings -> Environment Variables)
//   4. (Optional) Set RESEND_FROM_EMAIL to a verified "from" address, e.g.
//      "USA Copier Movers <quotes@highvalueproductshipping.com>"
//
// Until RESEND_API_KEY is set, submissions are still accepted (so the form
// never breaks for site visitors) and are written to the function logs.

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
  const route = (body.route || '').toString().trim();
  const details = (body.details || '').toString().trim();

  if (!name || !phone) {
    res.status(400).json({ error: 'Name and phone are required.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('New quote request (RESEND_API_KEY not set):', {
      name, phone, route, details, receivedAt: new Date().toISOString()
    });
    res.status(200).json({
      ok: true,
      note: 'Received. Email delivery is not configured yet.'
    });
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'USA Copier Movers <onboarding@resend.dev>';

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [TO_EMAIL],
        subject: 'New Copier Shipping Quote Request - ' + name,
        text: [
          'New quote request from usacopiermovers.com',
          '',
          'Name: ' + name,
          'Phone: ' + phone,
          'Route (Pickup -> Delivery ZIP): ' + (route || 'N/A'),
          'Equipment Details: ' + (details || 'N/A')
        ].join('\n')
      })
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend API error:', emailRes.status, errText);
      res.status(502).json({ error: 'Could not send email right now. Please call (866) 216-7742.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ error: 'Server error sending email. Please call (866) 216-7742.' });
  }
};
