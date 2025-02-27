"use server";
import nodemailer from "nodemailer";
interface EmailProps {
  to: string;
  subject: string;
  html: string;
}
export const sendEmail = async ({ to, subject, html }: EmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "Group Ease",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
