const UserSchema = {
  user_id: 'INT AUTO_INCREMENT PRIMARY KEY',
  first_name: 'VARCHAR(100)',
  last_name: 'VARCHAR(100)',
  email: 'VARCHAR(150) UNIQUE',
  password: 'VARCHAR(255)',
  id_proof_type: 'ENUM("Passport", "Aadhaar Card", "PAN Card")',
  id_number: 'VARCHAR(50)',
  id_verified: 'BOOLEAN DEFAULT FALSE',
  otp: 'VARCHAR(6)',
  otp_expires: 'DATETIME',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

module.exports = UserSchema;
