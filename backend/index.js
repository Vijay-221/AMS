require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const router=require('./routes/auth/regisrationRoutes')


const app = express();

app.use(cors());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json({limit:"20mb"}));



app.use('/api',router)
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


app.get("/", (req, res) => res.send("Auction Management API"));

