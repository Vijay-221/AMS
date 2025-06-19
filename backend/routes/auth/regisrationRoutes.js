const express = require('express');
const { registerUser } = require('../../controllers/auth/userRegistration');

const router = express.Router();
router.post('/signup', registerUser);

module.exports = router;
