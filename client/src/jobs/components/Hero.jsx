import React from "react";
import "./style/Hero.css";
import HeroImage from "../../assets/images/a-woman-looking-for-a-job-on-website.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-wrap">
          <div className="hero-content">
            <h1>Track Your Job Applications</h1>
            <p>Stay organized and never miss an opportunity!</p>
            <a href="/auth" className="btn-hero">
              Get Started
            </a>
          </div>

          <div className="hero-image">
            <img src={HeroImage} alt="Job Tracker" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
