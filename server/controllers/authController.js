const User = require('../models/Users');
const bcrypt = require('bcrypt');
const {generateUsername, generatePrivatekey}=require('../utils/userService');


const signup = async (req, res) => {
    
    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const username=await generateUsername(email);
        const privateKey=await generatePrivatekey(username);

        user = new User({
            name:name,
            email: email,
            password: hashedPassword,
            username_publickey: username,
            privateKey: privateKey
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const userdetail=async(req,res)=>{
    const {email}=req.body;

    try{
        const user = await User.findOne({ email:email });

        if (!user) {
            return res.json({ message: 'User does not exist' });
        }

        res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { signup, login , userdetail };
