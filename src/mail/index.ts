import nodemailer from 'nodemailer';

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'carrers.dp@gmail.com',
    pass: 'tfpk kcyg gvzb bxde',
  },
});

export async function getMailonRegister(data: any) {
  const { firstName, lastName, mobileNo, email, age, place } = data;
  try {
    await Transporter.sendMail({
      from: 'carrers.dp@gmail.com',
      // sender: 'dipakhade214@gmail.com',
      to: 'mindmiracles1707@gmail.com',
      subject: 'new registration',
      html: `<div>
        <h1>New Registration</h1>
        <p><b>Name:</b> <span>${firstName} ${lastName}</span></p>
        <p><b>Mobile No:</b> <span>${mobileNo}</span></p>
        <p><b>Email:</b> <span>${email}</span></p>
        <p><b>Age:</b> <span>${age}</span></p>
        <p><b>Place:</b> <span>${place}</span></p>
      </div>`,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function get21DaysProgramRegistrationMail(data: any) {
  const { name, whatsappNumber, batchNo, orderId, razorpayPaymentId, amount } =
    data;
  try {
    await Transporter.sendMail({
      from: 'carrers.dp@gmail.com',
      to: 'mindmiracles1707@gmail.com',
      subject: '21 Days Program - New Payment Received',
      html: `<div>
        <h1>21 Days Program Registration</h1>
        <p><b>Name:</b> <span>${name}</span></p>
        <p><b>WhatsApp Number:</b> <span>${whatsappNumber}</span></p>
        <p><b>Batch No:</b> <span>${batchNo ?? 'N/A'}</span></p>
        <p><b>Amount:</b> <span>₹${amount}</span></p>
        <p><b>Razorpay Order Id:</b> <span>${orderId}</span></p>
        <p><b>Razorpay Payment Id:</b> <span>${razorpayPaymentId}</span></p>
      </div>`,
    });
  } catch (error) {
    console.error('Error sending 21 days program mail:', error);
  }
}

export async function getTestResultMail(data: any) {
  try {
    const { name, age, occupation, mobile, email, score } = data;
    await Transporter.sendMail({
      from: 'carrers.dp@gmail.com',
      // sender: 'dipakhade214@gmail.com',
      to: 'mindmiracles1707@gmail.com',
      subject: 'Mental Health Assessment Result',
      html: `<div>
       <h1>Mental Health Assessment Result</h1>
       <p><b>Name:</b> <span>${name}</span></p>
       <p><b>Age:</b> <span>${age}</span></p>
       <p><b>Occupation:</b> <span>${occupation}</span></p>
       <p><b>Mobile:</b> <span>${mobile}</span></p>
       <p><b>Email:</b> <span>${email}</span></p>
       <p><b>Assessment Score:</b> <span>${score}/20</span></p>
       <p><b>Assessment Level:</b> <span>${
         score >= 15
           ? 'High Stress'
           : score >= 10
             ? 'Moderate Stress'
             : 'Manageable Stress'
       }</span></p>
     </div>`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
