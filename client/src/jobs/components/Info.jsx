import React from "react";
import InfoCard from "./InfoCard";
import "./style/Info.css";

const infoData = [
  {
    title: "Track Your Applications",
    description:
      "Log every job application you send, add details, and keep all your opportunities organized in one place.",
    icon: "📋",
  },
  {
    title: "Statistics",
    description:
      "View statistics about the companies you contacted, responses received, and your overall job search progress.",
    icon: "📊",
  },
  {
    title: "Stay Updated",
    description:
      "Get notified about the status of each application: received, waiting for response, interview, or feedback.",
    icon: "🔔",
  },
];

const Info = () => {
  return (
    <section className="info">
      <div className="container">
        <h2>How does Jobs Tracker work?</h2>
        <div className="info-cards">
          {infoData.map((card, idx) => (
            <InfoCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
