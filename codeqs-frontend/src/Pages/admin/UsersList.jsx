import React, { useState, useEffect } from 'react';
import DefaultAdminLayout from './layout/DefaultAdminLayout';
import './Userslist.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/show');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <DefaultAdminLayout>
            <div className="user-dashboard-wrapper">
                <div className="user-dashboard-body">
                    <div className="user-dashboard-content">
                        <h2>Welcome to your user dashboard!</h2>

                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {users.length > 0 ? (
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Education</th>
                                        <th>Occupation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone || 'N/A'}</td>
                                            <td>{user.education || 'N/A'}</td>
                                            <td>{user.occupation || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No user information available.</p>
                        )}
                    </div>
                </div>
            </div>
        </DefaultAdminLayout>
    );
};

export default UsersList;
