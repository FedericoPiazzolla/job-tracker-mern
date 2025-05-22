import React from "react";
import Hero from "../components/Hero";
import HeroTagLine from "../components/HeroTagLine";
import Info from "../components/Info";
import HowToUse from "../components/HowToUse";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <Hero />
        <HeroTagLine />
        <Info />
        <HowToUse />
      </div>
    </>
  );
};

export default LandingPage;
