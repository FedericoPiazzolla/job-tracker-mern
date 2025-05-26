import React from "react";

import "./style/ShowUserJob.css";

const statusClass = {
  applied: "status-applied",
  interviewing: "status-interviewing",
  offer: "status-offer",
  rejected: "status-rejected",
};

const DUMMY_JOBS = [
  {
    id: "j1",
    title: "Software Engineer",
    description: "Develop and maintain software applications.",
    website: "https://example.com",
    company: "Tech Corp",
    location: "New York, NY",
    status: "applied",
    date: "2023-10-01",
    salary: "$100,000 - $120,000",
    creator: "u1",
  },
];

const ShowUserJob = () => {
  return (
    <div className="userJojb-container">
      <div className="userJob-list">
        {DUMMY_JOBS.map((job) => (
          <div key={job.id} className="userJob-item">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <ul>
              <li>
                <strong>Company:</strong> {job.company}
              </li>
              <li>
                <strong>Location:</strong> {job.location}
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <span
                  className={`userJob-status ${
                    statusClass[job.status?.toLowerCase()] || ""
                  }`}>
                  {job.status}
                </span>
              </li>
              <li>
                <strong>Date:</strong> {new Date(job.date).toLocaleDateString()}
              </li>
              <li>
                <strong>Salary:</strong> {job.salary}
              </li>
            </ul>

            <div className="userJob-actions">
              <button className="user-job-btn userJob-edit-btn">Edit</button>
              <button className="user-job-btn userJob-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowUserJob;
