import React from "react";
import Hero from "../components/Hero";
import HeroTagLine from "../components/HeroTagLine";
import Info from "../components/Info";
import HowToUse from "../components/HowToUse";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <Hero />
        <HeroTagLine />
        <Info />
        <HowToUse />
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
