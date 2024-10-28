import './Login.css';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import login from '../../assets/login.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

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
        const url = signState === 'Sign In' ? 'http://localhost:8000/api/login' : 'http://localhost:8000/api/register';
        
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
            if (response.ok) {
               
                console.log(data.message);
                navigate("/");
            } else {
                setError(data.message);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

  const handlehome= () => {
    navigate('/'); 
  }

    return (
        <div className='login' style={{ display: 'inline',  backgroundColor:'#F7F5FA'}}>
           
            <FaArrowLeft onClick={handlehome} style={{fontSize:'30px', paddingLeft:'10px',marginTop:'10px'}}/>
            
            <div className="login-form">
                <div className="logo-left">
                    <img src={logo} alt="" className='logo-img' />
                    <p>Welcome to <br />CODE QS Online <br />Learning Platform</p>
                    <img src={login} alt="" className='login-img' />
                </div>
                <hr />
                <div className="logo-right">
                    <h1>{signState}</h1>
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
                                <label htmlFor="" className='rm'>Remember Me</label>
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