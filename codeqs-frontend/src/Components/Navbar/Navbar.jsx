import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import logo from '../../assets/codeqslogo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [userRole, setUserRole] = useState(null); // Track user role

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setIsAuthenticated(role === "user" || role === "admin" || role === "superadmin");
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleSignin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");  // Clear userRole from localStorage
    setIsAuthenticated(false);  // Update the state to false
    setUserRole(null);  // Clear user role
    navigate('/login');  // Navigate to the login page
  };

  return (
    <header className="navbar">
      <div>
        {/* <img src={logo} alt="Logo" className='logo-img' /> */}
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

        <Link to="/"> Home</Link>
        <Link to="/courses">Courses</Link>

        {isAuthenticated ? (
          <>
            {userRole === 'admin' && (
              // Show Admin Dashboard link for admin users
              <Link to="/admin-dashboard" className="admin-link">
                Admin Dashboard
              </Link>
            )}

            <button onClick={handleLogout} className="signup-btn">Logout</button>
          </>
        ) : (
          <button onClick={handleSignin} className="signup-btn">Sign up</button>
        )}
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
