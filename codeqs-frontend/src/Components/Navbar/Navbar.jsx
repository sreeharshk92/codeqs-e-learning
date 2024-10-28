import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import logo from '../../assets/codeqslogo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div>
        <img src={logo} alt="" className='logo-img' />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Find your next skill to master..." />
        <CiSearch className="search-icon" />
      </div>
      <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mob-search-bar">
          <input type="text" placeholder="Find your next skill to master..." />
          <CiSearch className="mob-search-icon" />
        </div>

        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/aboutus">About Us</Link>


       

        <button onClick={handleSignin} className="signup-btn">Sign up</button>

      </nav>


      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <span className="close-icon">&times;</span>
        ) : (

          <span className="hamburger-icon">&#9776;</span>


        )}
      </div>
    </header>
  );
};

export default Navbar;