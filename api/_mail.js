// Shared email sender. Uses Resend when RESEND_API_KEY is set (same Resend
// account as Andre's other sites), otherwise falls back to SendGrid.
//
// msg = { to: [emails], bcc: [emails], fromName, replyTo, subject, text, html,
//         attachments: [{ filename, content (base64), type }] }

function resendFrom(fromName) {
  const explicit = process.env.RESEND_FROM_EMAIL;
  const domain = (process.env.RESEND_EMAIL_DOMAIN || 'usavendingmachinemovers.com').trim();
  const addr = explicit || ('leads@' + domain);
  return fromName + ' <' + addr + '>';
}

async function sendMail(msg) {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const payload = {
      from: resendFrom(msg.fromName),
      to: msg.to,
      subject: msg.subject,
      text: msg.text
    };
    if (msg.html) payload.html = msg.html;
    if (msg.bcc && msg.bcc.length) payload.bcc = msg.bcc;
    if (msg.replyTo) payload.reply_to = msg.replyTo;
    if (msg.attachments && msg.attachments.length) {
      payload.attachments = msg.attachments.map(function (a) {
        return { filename: a.filename, content: a.content };
      });
    }
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const t = await r.text();
      console.error('Resend API error:', r.status, t);
      return { ok: false, provider: 'resend', status: r.status, error: t };
    }
    return { ok: true, provider: 'resend' };
  }

  const sgKey = process.env.SENDGRID_API_KEY;
  const sgFrom = process.env.SENDGRID_FROM_EMAIL;
  if (!sgKey || !sgFrom) return { ok: false, provider: 'none', error: 'No email provider configured' };

  const personalization = { to: msg.to.map(function (e) { return { email: e }; }) };
  if (msg.bcc && msg.bcc.length) personalization.bcc = msg.bcc.map(function (e) { return { email: e }; });
  const content = [{ type: 'text/plain', value: msg.text }];
  if (msg.html) content.push({ type: 'text/html', value: msg.html });
  const body = {
    personalizations: [personalization],
    from: { email: sgFrom, name: msg.fromName },
    reply_to: { email: msg.replyTo || sgFrom },
    subject: msg.subject,
    content: content
  };
  if (msg.attachments && msg.attachments.length) {
    body.attachments = msg.attachments.map(function (a) {
      return { content: a.content, filename: a.filename, type: a.type || 'application/octet-stream', disposition: 'attachment' };
    });
  }
  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + sgKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const t = await r.text();
    console.error('SendGrid API error:', r.status, t);
    return { ok: false, provider: 'sendgrid', status: r.status, error: t };
  }
  return { ok: true, provider: 'sendgrid' };
}

module.exports = sendMail;
module.exports.hasProvider = function () {
  return !!(process.env.RESEND_API_KEY || (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL));
};
