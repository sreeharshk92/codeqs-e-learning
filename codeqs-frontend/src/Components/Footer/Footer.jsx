import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Footer.css';
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { PiAddressBookLight } from "react-icons/pi";
import {  AiFillYoutube} from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="footer-line" />
      <div className="footer">
        <div className="footer-one">
          <img src={logo} alt="Logo" className="logof-img" />
          <p className='fp'>"At Codeqs, knowledge is power. Elevate your skills, transform your career, and achieve the success you deserve."</p>
          <ul className="social-icons">
  <li>
    <a
      href="https://youtube.com/@dmcodeqs?si=dGwAys5fnE-9H_OE"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
<AiFillYoutube style={{ fontSize: '30px' }}  />    </a>
  </li>
  <li>
    <a
      href="https://www.facebook.com/EduzellCodeQ"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <MdOutlineFacebook />
    </a>
  </li>
  <li>
    <a
      href="https://www.instagram.com/code_qs?igsh=aTA5dHc0OGN3eW03"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <TiSocialInstagramCircular />
    </a>
  </li>
  <li>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
     <FaLinkedin style={{ fontSize: '23px' }} />    </a>
  </li>
</ul>

        </div>
        <div className="footer-two">
    <h2>Our Address</h2>
    <ul>
        <li>
            <IoLocationOutline className="icon" />
            <span>Dew Space Business Center, Paramara Rd, Kacheripady, Kochi, Ernakulam, Kerala 682018</span>
        </li>
        <li>
            <IoCallOutline className="icon" />
            <span>+91 79071486811</span>
        </li>
        <li>
            <PiAddressBookLight className="icon" />
            <span>info@codeqs.in</span>
        </li>
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