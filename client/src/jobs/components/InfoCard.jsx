import React, { useRef, useEffect, useState } from "react";
import "./style/InfoCard.css";

const InfoCard = ({ icon, title, description }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`info-card${visible ? " visible" : ""}`}>
      <div className="info-card-icon-container">
        <div className="info-card-icon">{icon}</div>
      </div>
      <div className="info-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
