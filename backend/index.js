require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

app.use(cors());
app.use(express.json({limit:"20mb"}));

// Check DB connection before server start
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1);
  }
  console.log('MySQL database connected successfully!');
  connection.release();

  // Start server after DB connection success
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.use('/api/auth', registerRoutes);
app.use('/api/auth', loginRoutes);

app.get("/", (req, res) => res.send("Auction Management API"));

app.post('/signup',(req,res)=>{
  console.log(req.body);
})
