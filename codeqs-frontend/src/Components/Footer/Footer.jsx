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
            <li>Help Center</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-four">
          <h2>Quick Link</h2>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Blog</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <hr className="footer-line" />
    </>
  );
};

export default Footer;