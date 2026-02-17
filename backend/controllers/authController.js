import { db } from "../config/db.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jimmyedelacruz872@gmail.com",
    pass: "xawl javk wecl tdtu",
  },
});

export const signup = (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);

    const mailOptions = {
      from: "jimmyedelacruz872@gmail.com",
      to: email,
      subject: "Verify Your Email",
      html: `<a href="http://localhost:3000/verify/${result.insertId}">Click to Verify</a>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).send(err);
      res.send("Verification email sent");
    });
  });
};
