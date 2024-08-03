const nodemailer = require('nodemailer')
require('dotenv').config()

const sendVerificationCode = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Usar el servicio de tu preferencia
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendVerificationCode
