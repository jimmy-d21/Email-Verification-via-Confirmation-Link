import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "email_verification",
});

db.connect((err) => {
  if (err) console.log("DB Connection Error:", err);
  else console.log("MySQL Connected");
});
