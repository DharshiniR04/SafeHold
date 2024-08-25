const User = require('../models/Users');
const crypto = require('crypto');

const generateUsername = async (email) => {

    const first= email.split('@')[0];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); 
    const username = `${first}_${randomSuffix}`;
    const existingUser = await User.findOne({ username });
    // const users=await User.find();
    // users.forEach((data)=>{
    //     console.log(data.username_publickey+" "+data.privateKey);
    // })
    if (existingUser) {
        return generateUsername(email);
    }

    return username;
};

const generatePrivatekey = async (username) => {
    const privateKey = crypto.randomBytes(32).toString('hex');
    return privateKey;
};

module.exports={generateUsername,generatePrivatekey};