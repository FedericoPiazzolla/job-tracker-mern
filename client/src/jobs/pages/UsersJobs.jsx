import React from "react";

import "./style/UsersJobs.css";

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
  {
    id: "j2",
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets.",
    website: "https://example.com",
    company: "Tech Corp",
    location: "San Francisco, CA",
    status: "interviewing",
    date: "2023-10-02",
    salary: "$120,000 - $140,000",
    creator: "u1",
  },
];

const UsersJobs = () => {
  return <div className="user-jobs">UsersJobs</div>;
};

export default UsersJobs;
