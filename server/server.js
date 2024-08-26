const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes=require('./routes/transactionRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors({
     origin:["https://safe-hold.vercel.app/"],
     methods:["GET","POST","PATCH","DELETE","PUT"],
     credentials:true
}));
app.use(express.json());

app.get("/",async(req,res)=>{
     res.json("WELCOME TO SAFEHOLD");
})

app.use('/api/auth', authRoutes);
app.use('/api/tran',transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
