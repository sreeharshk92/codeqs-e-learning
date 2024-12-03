import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        // Replace with your actual admin credentials
        const adminUsername = 'admin';
        const adminPassword = 'admin123';

        // Check if the entered credentials match
        if (username === adminUsername && password === adminPassword) {
            // Store a flag indicating the user is an admin
            localStorage.setItem('userRole', 'admin');

            // Navigate to the admin dashboard
            navigate('/admin-dashboard');
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className='admin-login-container'>
            <div className='admin-login-box'>
                <h1 className='admin-login-title'>Admin Login</h1>
                <form onSubmit={handleAdminLogin} className='admin-login-form'>
                    <div>
                        <label className='admin-login-label' htmlFor="">Username</label>
                        <input
                            type="text"
                            placeholder='Enter your username'
                            className='admin-login-input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='admin-login-label' htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            className='admin-login-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className='admin-login-btn'>Login</button>
                    </div>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
