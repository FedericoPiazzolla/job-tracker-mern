import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import JobCard from "../components/JobCard";
import JobsFilters from "../components/JobsFilters";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./style/UsersJobs.css";

const UsersJobs = () => {
  const [loadedJobs, setLoadedJobs] = useState();
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5010/api/jobs/user/${userId}`
        );
        console.log("Response data from backend:", responseData);
        setLoadedJobs(responseData.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [sendRequest, userId]);

  const jobDeletedHandler = (deletedJobId) => {
    console.log("Deleting job with id:", deletedJobId);
    setLoadedJobs((prevJobs) =>
      prevJobs.filter((job) => job.id !== deletedJobId)
    );
  };

  const hasApplications = loadedJobs && loadedJobs.length > 0;

  const filteredJobs = loadedJobs
    ? loadedJobs.filter((job) =>
        statusFilter === "all" ? true : job.status === statusFilter
      )
    : [];

  filteredJobs.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="user-jobs">
      <div className="user-jobs__header">
        <NavLink to={`/jobs/${userId}/new`} className="user-jobs__add-button">
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
              <JobCard
                key={job.id}
                {...job}
                onDeleteJob={jobDeletedHandler}
                onClick={() => navigate(`/${userId}/jobs/${job.id}`)}
              />
            ))}
          </>
        ) : (
          <li className="user-jobs__empty">
            No applications found. Click <b>Add Application</b> to create your
            first one!
          </li>
        )}
      </ul>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={error} onClear={clearError} />
    </div>
  );
};

export default UsersJobs;
