const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});

const sendMail = async (receiverMail, subject, body) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: receiverMail,
    subject: subject, //tieu de email
    html: body, // noi dung cua email
  });
};

module.exports = sendMail;
