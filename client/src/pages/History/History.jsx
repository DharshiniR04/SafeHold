import React, { useEffect, useState } from "react";
import './History.css';
import { SelectedUser } from "../../context/userContext";
import axios from "axios";

function History() {
    const { userDetail } = SelectedUser();
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkTransaction = async () => {
            try {
                const response = await axios.post("http://localhost:5000/api/tran/gettransaction", { email: userDetail.email,to:userDetail.username_publickey });
                setTransaction(response.data);
            } catch (err) {
                setError("Failed to load transaction history.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        checkTransaction();
    }, [userDetail.email,userDetail.username_publickey]);

    if (loading) return <div className="history">Loading...</div>;

    if (error) return <div className="history-error">{error}</div>;

    return (
        <div className="history">
            <h2 className="history-title">Transaction History</h2>
            {transaction.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{transaction.from}</td>
                                <td>{transaction.to}</td>
                                <td className={(transaction.from!==userDetail.name) ? 'negative' : 'positive'}>
                                    {transaction.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default History;
