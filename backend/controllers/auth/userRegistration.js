const bcrypt = require("bcrypt");
const { findUserByEmail, insertUser } = require('../../models/userModel');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, idType, idNumber, password, confirmPassword, image } = req.body;

  // Validation
  if (!firstName || !email || !password || !confirmPassword || !idType || !idNumber) {
    return res.status(400).json({ 
      message: "All fields are required", 
      alert: false 
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ 
      message: "Passwords do not match", 
      alert: false 
    });
  }

  findUserByEmail(email, async (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        message: "Server error", 
        alert: false 
      });
    }

    if (result.length > 0) {
      return res.status(409).json({ 
        message: "User already exists", 
        alert: false 
      });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

      const user = {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        id_proof: idType,
        id_number: idNumber,
        profile_image: image,
      };

      insertUser(user, (err, result) => {
        if (err) {
          console.error('Registration error:', err);
          return res.status(500).json({ 
            message: "Failed to register user", 
            alert: false 
          });
        }

        return res.status(201).json({ 
          message: "Registered successfully", 
          alert: true,
          userId: result.insertId 
        });
      });
    } catch (hashError) {
      console.error("Hashing error:", hashError);
      return res.status(500).json({
        message: "Error while securing password",
        alert: false
      });
    }
  });
};

module.exports = { registerUser };
