import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import JobCard from "../components/JobCard";
import JobsFilters from "../components/JobsFilters";

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
  {
    id: "j5",
    title: "DevOps Engineer",
    description: "Manage and optimize cloud infrastructure.",
    website: "https://example.com",
    company: "Tech Corp",
    location: "Boston, MA",
    status: "applied",
    date: "2023-10-05",
    salary: "$105,000 - $125,000",
    creator: "u1",
  },
];

const UsersJobs = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");

  const hasApplications = DUMMY_JOBS.length > 0;

  const filteredJobs = DUMMY_JOBS.filter((job) =>
    statusFilter === "all" ? true : job.status === statusFilter
  ).sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="user-jobs">
      <div className="user-jobs__header">
        <NavLink to="/jobs/u1/new" className="user-jobs__add-button">
          Add Application
          <span>
            <FaPlus />
          </span>
        </NavLink>
      </div>
      <ul className="user-jobs__list">
        {hasApplications ? (
          <>
            <li className="user-jobs__list-title">
              Current Applications
              <JobsFilters
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </li>
            {filteredJobs.map((job) => (
              <NavLink
                to={`/u1/jobs/${job.id}`}
                key={job.id}
                className="user-jobs__item-link">
                <JobCard
                  id={job.id}
                  title={job.title}
                  location={job.location}
                  status={job.status}
                  date={job.date}
                />
              </NavLink>
            ))}
          </>
        ) : (
          <li className="user-jobs__empty">
            No applications found. Click <b>Add Application</b> to create your
            first one!
          </li>
        )}
      </ul>
    </div>
  );
};

export default UsersJobs;
