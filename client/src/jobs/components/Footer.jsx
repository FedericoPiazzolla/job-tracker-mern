import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import "./style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a
          href="https://github.com/FedericoPiazzolla"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub">
          <FaGithub size={28} />
        </a>
        <a
          href="https://www.linkedin.com/in/federico-piazzolla/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn">
          <FaLinkedin size={28} />
        </a>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Federico Piazzolla. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
