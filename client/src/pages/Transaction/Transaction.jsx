import React, { useState } from "react";
import { SelectedUser } from "../../context/userContext";
import './Transaction.css';
import axios from "axios";


function Transaction() {
    const [isSending, setIsSending] = useState(true);
    const { userDetail ,setUserDetail} = SelectedUser();

    const updateUserDetail=async(email)=>{
            try{
               const response=await axios.post("https://safe-hold-server.vercel.app/api/auth/userdetail",{email:email});
               setUserDetail(response.data);
            }
            catch(err){
                console.log(err);
            }
    }

    const handleTransaction = async (event) => {
        event.preventDefault();
        const errTag = document.getElementById("errorTagTransaction");
        errTag.textContent = "";
        const data = {
            recipient: event.target.elements.recipient.value,
            amount: event.target.elements.amount.value
        }
        try {
            const response = await axios.post("https://safe-hold-server.vercel.app/api/tran/transaction", { email: userDetail.email, from: userDetail.name, to: data.recipient, amount: data.amount });
            console.log(response);
            if (response.data.message === "Recipient does not exist") {
                errTag.textContent = "Recipient does not exist";
            }
            else if (response.data.message === "Insufficiet amount") {
                errTag.textContent = "Insufficiet amount";
            }
            else if (response.data.message === "Recipient can't be same as sender") {
                errTag.textContent = "Recipient can't be same as sender";
            }
            else if (response.data.message === "Transaction done") {
                await updateUserDetail(userDetail.email,userDetail.username_publickey);
                alert("Transaction done successfully");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="transaction-container">
            <div className="transaction-tabs">
                <button
                    className={`transaction-tab ${isSending ? "active" : ""}`}
                    onClick={() => setIsSending(true)}
                >
                    Send Money
                </button>
                <button
                    className={`transaction-tab ${!isSending ? "active" : ""}`}
                    onClick={() => setIsSending(false)}
                >
                    Receive Money
                </button>
            </div>

            <div className="transaction-content">
                {isSending ? (
                    <>
                        <div className="send-money">
                            <h3>Send Money</h3>
                            <form onSubmit={handleTransaction}>
                                <label>Recipient</label>
                                <input type="text" placeholder="Recipient's Username" name="recipient" required />
                                <label>Amount</label>
                                <input type="number" placeholder="Rs. " name="amount" required />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                        <p id="errorTagTransaction"></p>
                    </>
                ) : (
                    <div className="receive-money">
                        <h3>Receive Money</h3>
                        <p>Share your username with others to receive money.</p>
                        <p>Your Username: <strong>{userDetail.username_publickey}</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transaction;
