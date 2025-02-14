import './Login.css';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import baseUrl from '../../config/baseUrl';

const Login = () => {
    const [signState, setSignState] = useState('Sign In');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = signState === 'Sign In' ? `${baseUrl}/api/login` : `${baseUrl}/api/register`;

        
        const body = signState === 'Sign In'
            ? { email, password }
            : { name, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            console.log("API response:", data);

            if (response.ok) {
                console.log("Login successful for:", data.user.name);

                // Store user details if available
                const userRole = data.user.role;
                const userName = data.user.name;
                const userEmail = data.user.email;
                const userId = data.user.id;

                if (userRole) {
                    localStorage.setItem('userRole', userRole); // Store role
                    localStorage.setItem('userName', userName); // Store name
                    localStorage.setItem('userEmail', userEmail); // Store email
                    localStorage.setItem('userId', userId); // Store id
                }

                if (data.token) {
                    localStorage.setItem('token', data.token); // Store token if available
                }

                // Redirect to homepage (if user is not an admin)
                if (userRole !== 'admin') {
                    navigate('/');
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    const handlehome = () => {
        navigate('/');
    };

    return (
        <div className='login' style={{ display: 'inline' }}>
            <FaArrowLeft onClick={handlehome} style={{ fontSize: '30px', paddingLeft: '10px', marginTop: '10px' }} />
            <div className="login-form">
                <div className="logo-left">
                    <img src={logo} alt="" className='logo-img' />
                    <p className='left-p'>Welcome to <br />CODE QS Online <br />Learning Platform</p>
                    <img src={login} alt="" className='login-img' />
                </div>
                <hr className='loginhr'/>
                <div className="logo-right">
                    <h1 className='right-h1'>{signState}</h1>
                    <form onSubmit={handleSubmit}>
                        {signState === 'Sign Up' && (
                            <input
                                type="text"
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">{signState}</button>
                        {error && <p className="error">{error}</p>}
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" className='chkbx' />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <p>Need Help?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === 'Sign In'
                            ? <p>New to? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p>
                            : <p>Already have an account? <span onClick={() => setSignState('Sign In')}>Sign In Now</span></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
