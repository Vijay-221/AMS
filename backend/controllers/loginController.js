const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.id_verified) return res.status(401).json({ error: "Please verify your email first" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ error: "Invalid credentials" });

    // For simplicity, no JWT yet
    res.status(200).json({ message: "Login successful", user_id: user.user_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
