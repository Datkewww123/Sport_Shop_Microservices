const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (!transporter) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      console.warn('[Email] SMTP credentials not configured. Emails will be logged only.');
      return null;
    }

    transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(SMTP_PORT || '587'),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    transporter.verify().then(() => {
      console.log('[Email] SMTP transporter ready');
    }).catch((err) => {
      console.error('[Email] SMTP verification failed:', err.message);
    });
  }
  return transporter;
}

module.exports = { getTransporter };
