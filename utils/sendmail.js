const nodemailer = require('nodemailer');

// Transporter needed to deliver messages 
  // Simple Mail Transfer Protocol (SMTP)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
    auth: {
      user: 'bookreviewerproject@gmail.com',
      pass: 'jfys tuxk afol ermb'
    }
  });

// NodeMailer message - async to start potentially long task 
  async function sendEmail(userEmail) { 
    const info = await transporter.sendMail({
    from: 'BookReviewerProject@gmail.com',
    to: userEmail,
    subject: 'Welcome to Book Reviewer!📚🐛',
    text: "Welcome fellow bookworms! We appreciate you joining our Book Review website. Quick search and review each book you read with ease! We are a small group of devs-in-training at the University of New Hampshire's Bootcamp. Please feel free to email us at BookReviewerpPoject@gmail.com with questions, concerns, or ideas!"
   });
  
// Error if sign up message doesn't send
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  };

  sendEmail().catch(console.error);

  module.exports = { sendEmail }