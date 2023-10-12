const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: 'bookreviewerproject@gmail.com',
      pass: 'process.env.EMAIL_PASS'
    }
  });

  const mailOptions = {
    from: 'bookreviewerproject@gmail.com',
    to: 'recipient@example.com',
    subject: 'Welcome to Book Reviewer!📚🐛',
    text: "Welcome fellow bookworms! We appreciate you joining our Book Review website. Quick search and review each book you read with ease! We are a small group of devs-in-training at the University of New Hampshire's Bootcamp. Please feel free to email us at BookReviewerpPoject@gmail.com with questions, concerns, or ideas!"
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });