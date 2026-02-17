import { db } from "../config/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const signup = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password required");

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send("Database error: " + err.message);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<h2>Email Verification</h2>
             <p>Click the link below to verify your email:</p>
             <a href="http://localhost:${process.env.PORT}/verify/${result.insertId}">Verify Email</a>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err)
        return res.status(500).send("Email sending error: " + err.message);
      res.send("Verification email sent");
    });
  });
};

export const verifyEmail = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE users SET is_verified = true WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send("Verification failed: " + err.message);
    res.send("Email verified successfully!");
  });
};
