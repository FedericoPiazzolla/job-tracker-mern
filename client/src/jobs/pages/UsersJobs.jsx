import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import JobCard from "../components/JobCard";
import JobsFilters from "../components/JobsFilters";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Toast from "../../shared/components/UIElements/Toast";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./style/UsersJobs.css";

const UsersJobs = () => {
  const [loadedJobs, setLoadedJobs] = useState();
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const userId = auth.userId;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchJobs = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5010/api/jobs/user/${userId}`
        );
        setLoadedJobs(responseData.jobs);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [sendRequest, userId]);

  useEffect(() => {
    if (!location.state?.toast) return;

    setToastMessage(location.state.toast);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

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
      <Toast message={toastMessage} />
      <div className="user-jobs__header">
        <NavLink to="/jobs/new" className="user-jobs__add-button">
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
                to={`/jobs/${job.id}`}
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
