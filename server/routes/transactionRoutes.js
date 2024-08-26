const express=require("express");
const {transaction,getTransaction}=require("../controllers/transactionController");
const router=express.Router();

router.post('/transaction',transaction);
router.post('/gettransaction',getTransaction);

module.exports=router;