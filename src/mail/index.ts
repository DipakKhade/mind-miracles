import nodemailer from 'nodemailer';

const Transporter = nodemailer.createTransport({
  host: process.env.ENDPOINT || 'email-smtp.eu-north-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME || 'AKIAW3MEBDWDAQYVRSW2',
    pass:
      process.env.SMTP_PASSWORD ||
      'BKQf6ArmUEcHwznX3UEW8HXPJqU8vPFSCTbLtvzcYso/',
  },
});

export async function getMailonRegister(data: any) {
  const { firstName, lastName, mobileNo, email, age, place } = data;
  await Transporter.sendMail({
    from: 'dipakhade214@gmail.com',
    sender: 'dipakhade214@gmail.com',
    to: 'mindmiracles1707@gmail.com',
    // to: 'dipak841184@gmail.com',
    subject: 'new registration',
    html: `<div>

  <h1>New Regestration </h1>
  <p>
    <b>Name:</b>
    <span>${firstName} ${lastName}</span>
  </p>
  <p>
    <b>Mobile No:</b>
    <span>${mobileNo}</span>
  </p>
  <p>
    <b>Email:</b>
    <span>${email}</span>
  </p>
  <p>
    <b>Age:</b>
    <span>${age}</span>
  </p>
  <p>
    <b>Place:</b>
    <span>${place}</span>
  </p>
  
</div>`,
  });
}
