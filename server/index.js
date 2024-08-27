const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("WELCOME TO SAFEHOLD");
});

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT,()=>{console.log("Running on port 5000")});

