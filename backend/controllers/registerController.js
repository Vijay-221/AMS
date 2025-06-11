const db = require('../config/db');
const bcrypt = require('bcrypt');
const sendOtp = require('../utils/sendOtp');

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, confirm_password, id_proof_type, id_number } = req.body;

  if (password !== confirm_password) return res.status(400).json({ error: "Passwords do not match" });

  try {
    const [existing] = await db.promise().execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await db.promise().execute(
      `INSERT INTO users (first_name, last_name, email, password, id_proof_type, id_number, otp, otp_expires) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, id_proof_type, id_number, otp, otp_expires]
    );

    await sendOtp(email, otp);
    res.status(201).json({ message: "User registered. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
