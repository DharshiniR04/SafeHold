const Users = require("../models/Users");
const Transaction = require("../models/Transaction");

const transaction = async (req, res) => {
    const { email, from, to, amount } = req.body
    try {

        const user = await Users.findOne({ email: email });
        const recipient=await Users.findOne({username_publickey:to});

        if(!recipient){
            res.json({ message: "Recipient does not exist" });
            return;
        }
        if(user.username_publickey===to){
            res.json({ message: "Recipient can't be same as sender" });
            return; 
        }
        if (!user) {
            res.json({ message: "User does not exist" });
            return;
        }
        if (user.amount >= (+amount) + 100) {
            await Users.updateOne({ email: email }, { $inc: { amount: -amount } });
            await Users.updateOne({ username_publickey: to }, { $inc: { amount: amount } });
            await Transaction.insertMany({email:email,from:from,to:to,amount:amount});
            res.json({message:"Transaction done"});
        }
        else {
            res.json({ message: "Insufficiet amount" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getTransaction=async(req,res)=>{
    const {email,to}=req.body;

    try{
        const user=await Transaction.find({$or:[{email:email},{to:to}]});

        res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { transaction ,getTransaction};