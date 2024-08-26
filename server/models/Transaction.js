
const mongoose=require("mongoose");

const TransactionSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=new mongoose.model("transaction",TransactionSchema);