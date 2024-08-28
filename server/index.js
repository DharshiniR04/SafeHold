const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes=require('./routes/transactionRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "https://safe-hold-client.vercel.app", 
  methods: ["POST", "GET"],
  credentials: true
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://safe-hold-client.vercel.app"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
    res.json("WELCOME TO SAFEHOLD");
});

app.use('/api/auth', authRoutes);
app.use('/api/tran',transactionRoutes);

app.listen(process.env.PORT,()=>{console.log("Running on port 5000")});

