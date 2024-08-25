import React, { useState } from "react";
import './Transaction.css';
import { SelectedUser } from "../../context/userContext";

function Transaction() {
    const [isSending, setIsSending] = useState(true);
    const {userDetail}=SelectedUser();

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
                    <div className="send-money">
                        <h3>Send Money</h3>
                        <form>
                            <label>Recipient</label>
                            <input type="text" placeholder="Recipient's Username" required />
                            <label>Amount</label>
                            <input type="number" placeholder="Rs. " required />
                            <button type="submit">Send</button>
                        </form>
                    </div>
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
