import React from "react";
import Hero from "../components/Hero";
import HeroTagLine from "../components/HeroTagLine";
import Info from "../components/Info";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <Hero />
        <HeroTagLine />
        <Info />
      </div>
    </>
  );
};

export default LandingPage;
