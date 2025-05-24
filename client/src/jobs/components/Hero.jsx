import React from "react";
import "./style/Hero.css";
import HeroImage from "../../assets/images/business-analytics.svg";

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-wrap">
          <div className="hero-content">
            <h1>Track Your Job Applications</h1>
            <p>
              Stay organized and never miss an opportunity.
              <span className="hero-description">
                with our job application tracker, you can easily monitor every
                application, follow up with ease, and keep your job search under
                control from start to finish.
              </span>
            </p>
            <a href="" className="btn-hero">
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
