import nodemailer from 'nodemailer';

export async function getMailonRegester(mailHtml:string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
      user: 'resend',
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: 'dipakhade214@gmail.com',
    to: 'dipak841184@gmail.com',
    subject: 'new Registration',
    html: mailHtml,
  });

  console.log('Message sent: %s', info.messageId);
}

