import nodemailer from "nodemailer";

const Transporter = nodemailer.createTransport({
  host: process.env.ENDPOINT,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function getMailonRegester(data: any) {
  await Transporter.sendMail({
    from: "dipakhade214@gmail.com", //aws verified email
    sender: "dipakhade214@gmail.com",
    to: "dipak841184@gmail.com",
    subject: "new registration",
    html: `<div>

  <h1>New Regestration </h1>
  <p>
    <b>Name:</b>
    <span>${data.firstName} ${data.lastName}</span>
  </p>
  <p>
    <b>Mobile No:</b>
    <span>${data.mobileNo}</span>
  </p>
  <p>
    <b>Email:</b>
    <span>${data.email}</span>
  </p>
  <p>
    <b>Age:</b>
    <span>${data.age}</span>
  </p>
  <p>
    <b>Place:</b>
    <span>${data.place}</span>
  </p>
  
</div>`,
  });
}
