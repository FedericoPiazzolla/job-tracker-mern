import React from "react";
import Hero from "../components/Hero";
import HeroTagLine from "../components/HeroTagLine";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <Hero />
        <HeroTagLine />
      </div>
    </>
  );
};

export default LandingPage;
