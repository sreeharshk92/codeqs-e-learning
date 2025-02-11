import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Footer.css";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { PiAddressBookLight } from "react-icons/pi";
import { AiFillYoutube } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="footer-line" />
      <footer className="footer">
        <div className="footer-column footer-about">
          <img src={logo} alt="Codeqs Logo" className="footer-logo" />
          <p className="footer-text">
            "At Codeqs, knowledge is power. Elevate your skills, transform your
            career, and achieve the success you deserve."
          </p>
          <ul className="social-icons">
            <li>
              <a
                href="https://youtube.com/@dmcodeqs?si=dGwAys5fnE-9H_OE"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <AiFillYoutube />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/EduzellCodeQ"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <MdOutlineFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/code_qs?igsh=aTA5dHc0OGN3eW03"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <TiSocialInstagramCircular />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-address">
          <h2>Contact Us</h2>
          <ul>
            <li>
              <IoLocationOutline className="icon" />
              <span>Dew Space Business Center, Kacheripady, Kochi, Kerala 682018</span>
            </li>
            <li>
              <IoCallOutline className="icon" />
              <span>+91 7907148681</span>
            </li>
            <li>
              <PiAddressBookLight className="icon" />
              <span>info@codeqs.in</span>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-links">
          <h2>Resources</h2>
          <ul>
            <li>
              <Link to="/help-center" className="footer-link">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="footer-link">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="footer-link">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="footer-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <hr className="footer-line" />
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Codeqs. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
