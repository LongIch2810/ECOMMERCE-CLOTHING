const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendMail = async (receiverMail, subject, body) => {
  try {
    const textVersion = body.replace(/<[^>]*>?/gm, ""); // Chuyển HTML thành text

    const info = await transporter.sendMail({
      from: `"DIRTY CLOTHES" <${process.env.ADMIN_EMAIL}>`,
      to: receiverMail,
      subject: subject,
      text: textVersion, // Nội dung không HTML
      html: body, // Nội dung HTML
      replyTo: process.env.ADMIN_EMAIL, // Giúp email tin cậy hơn
    });

    console.log("Email đã gửi:", info);
  } catch (error) {
    console.error("Lỗi gửi email:", error);
  }
};

module.exports = sendMail;
