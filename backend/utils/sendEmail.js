import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

const sendEmail = async ({ subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      family: 4, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      text,
    });

    console.log("✅ Email sent!");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw new Error("Failed to send email.");
  }
};

export default sendEmail;
