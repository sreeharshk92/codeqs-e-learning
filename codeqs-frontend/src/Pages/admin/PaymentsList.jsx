import React, { useState, useEffect } from 'react';
import DefaultAdminLayout from './layout/DefaultAdminLayout';
import './PaymentsList.css';
import baseUrl from '../../config/baseUrl';

const PaymentsList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/payments-list`);
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setPayments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return (
        <DefaultAdminLayout>
            <div className="user-dashboard-wrapper">
                <div className="user-dashboard-body">
                    <div className="user-dashboard-content">
                        <h2>Welcome to your Payments dashboard!</h2>

                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {payments.length > 0 ? (
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order id</th>
                                        <th>Payment id</th>
                                        <th>Status</th>
                                        <th>Course name</th>
                                        <th>Amount</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{payment.id}</td>
                                            <td>{payment.order_id}</td>
                                            <td>{payment.payment_id}</td>
                                            <td>{payment.status}</td>
                                            <td>{payment.course_name}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.name}</td>
                                            <td>{payment.email}</td>
                                            <td>{payment.phone || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No payments information available.</p>
                        )}
                    </div>
                </div>
            </div>
        </DefaultAdminLayout>
    );
};

export default PaymentsList;
