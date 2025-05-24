import React from "react";

import { NavLink } from "react-router-dom";
import JobCard from "../components/JobCard";

import "./style/UsersJobs.css";

import { FaPlus } from "react-icons/fa";

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
  {
    id: "j3",
    title: "Product Manager",
    description: "Lead product development and strategy.",
    website: "https://example.com",
    company: "Tech Corp",
    location: "Austin, TX",
    status: "offer",
    date: "2023-10-03",
    salary: "$110,000 - $130,000",
    creator: "u1",
  },
  {
    id: "j4",
    title: "UX Designer",
    description: "Design user-friendly interfaces and experiences.",
    website: "https://example.com",
    company: "Tech Corp",
    location: "Seattle, WA",
    status: "rejected",
    date: "2023-10-04",
    salary: "$90,000 - $110,000",
    creator: "u1",
  },
];

const UsersJobs = () => {
  return (
    <div className="user-jobs">
      <div className="user-jobs__header">
        <h2 className="user-jobs__title">My Applications</h2>
        <NavLink to="/jobs/u1/new" className="user-jobs__add-button">
          Add Application{" "}
          <span>
            <FaPlus />
          </span>
        </NavLink>
      </div>
      <ul className="user-jobs__list">
        {DUMMY_JOBS.map((job) => (
          <JobCard
            id={job.id}
            title={job.title}
            location={job.location}
            status={job.status}
            date={job.date}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersJobs;
