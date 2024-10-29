import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Footer.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { PiAddressBookLight } from "react-icons/pi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="footer-line" />
      <div className="footer">
        <div className="footer-one">
          <img src={logo} alt="Logo" className="logoimg" />
          <p className='fp'>CODE QS is a registered <br /> trademark of CODE QS.co</p>
          <ul className="social-icons">
            <li><AiFillTwitterCircle /></li>
            <li><MdOutlineFacebook /></li>
            <li><TiSocialInstagramCircular /></li>
            <li><FaLinkedin /></li>
          </ul>
        </div>
        <div className="footer-two">
          <h2>Our Address</h2>
          <ul>
            <li><IoLocationOutline className="icon" /> ABC Street</li>
            <li><IoCallOutline className="icon" /> +91 7056897411</li>
            <li><PiAddressBookLight className="icon" /> example@gmail.com</li>
          </ul>
        </div>
        <div className="footer-three">
          <h2>Documentation</h2>
          <ul>
            <li><Link to="/help-center" className="footer-link">Help Center</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-four">
          <h2>Quick Link</h2>
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/courses" className="footer-link">Courses</Link></li>
            <li><Link to="/blog" className="footer-link">Blog</Link></li>
            <li><Link to="/about-us" className="footer-link">About Us</Link></li>
            <li><Link to="/contact-us" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <hr className="footer-line" />
    </>
  );
};

export default Footer;
