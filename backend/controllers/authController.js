import { db } from "../config/db.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jimmyedelacruz872@gmail.com",
    pass: "xawl javk wecl tdtu",
  },
});
