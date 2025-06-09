import React from "react";
import "./style/JobCard.css";

const statusClass = {
  applied: "status-applied",
  interviewing: "status-interviewing",
  offer: "status-offer",
  rejected: "status-rejected",
};

const JobCard = (props) => {
  // Se non c'è un job, non renderizzare nulla
  if (!props.id) return null;

  const statusKey = props.status?.toLowerCase();
  return (
    <li key={props.id} className="user-jobs__item">
      <h3 className="user-jobs__item-title">{props.title}</h3>
      <p className="user-jobs__item-location">{props.location}</p>
      <p className={`user-jobs__item-status ${statusClass[statusKey] || ""}`}>
        {props.status}
      </p>
      <p className="user-jobs__item-date">
        {new Date(props.date).toLocaleDateString()}
      </p>
    </li>
  );
};

export default JobCard;
