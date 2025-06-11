const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your OTP for Email Verification",
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`
  });
};

module.exports = sendOtp;
