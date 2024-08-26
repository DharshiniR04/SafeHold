const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ["https://safe-hold.vercel.app/"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json("WELCOME TO SAFEHOLD");
});

app.use('/api/auth', authRoutes);

module.exports = app;
