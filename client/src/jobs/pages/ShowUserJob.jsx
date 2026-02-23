import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import "./style/ShowUserJob.css";

const statusClass = {
  applied: "status-applied",
  interviewing: "status-interviewing",
  interview: "status-interviewing",
  offer: "status-offer",
  rejected: "status-rejected",
};

const ShowUserJob = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [job, setJob] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5010/api/jobs/${jobId}`
        );
        setJob(responseData.job);
      } catch (err) {}
    };

    fetchJob();
  }, [jobId, sendRequest]);

  const handleSave = async (updatedFields) => {
    if (!job) return;

    const normalizedDate = updatedFields.date || job.date;
    const payload = {
      title: updatedFields.title || job.title,
      description: updatedFields.description || job.description,
      website: updatedFields.website || job.website || "",
      company: updatedFields.company || job.company,
      location: updatedFields.location || job.location,
      status: updatedFields.status || job.status,
      date: normalizedDate,
      salary: updatedFields.salary || job.salary,
    };

    try {
      const responseData = await sendRequest(
        `http://localhost:5010/api/jobs/${jobId}`,
        "PATCH",
        JSON.stringify(payload),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setJob(responseData.job);
      setIsEditing(false);
      navigate("/jobs", {
        state: { toast: "Application updated successfully." },
      });
    } catch (err) {
      console.error("Update job failed:", err);
    }
  };

  const showDeleteWarningHandler = () => {
    setShowDeleteModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteHandler = async () => {
    setIsDeleting(true);
    setShowDeleteModal(false);
    try {
      await sendRequest(
        `http://localhost:5010/api/jobs/${jobId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/jobs", {
        state: { toast: "Application deleted successfully." },
      });
    } catch (err) {
      console.error("Delete job failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading && !job) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job && !isLoading) {
    return (
      <div className="center">
        <p>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="userJojb-container">
      <div className="userJob-list">
        {isEditing ? (
          <JobForm job={job} mode="edit" onSave={handleSave} />
        ) : (
          <div className="userJob-item">
            <h3>{job.title}</h3>
            <p className="userJob-list-description">{job.description}</p>
            <ul>
              <li>
                <strong className="userJob-item-strong">Company:</strong>{" "}
                {job.company}
              </li>
              <li>
                <strong className="userJob-item-strong">Location:</strong>{" "}
                {job.location}
              </li>
              <li>
                <strong className="userJob-item-strong">Status:</strong>{" "}
                <span
                  className={`userJob-status ${
                    statusClass[job.status?.toLowerCase()] || ""
                  }`}>
                  {job.status}
                </span>
              </li>
              <li>
                <strong className="userJob-item-strong">Date:</strong>{" "}
                {new Date(job.date).toLocaleDateString()}
              </li>
              <li>
                <strong className="userJob-item-strong">Salary:</strong>{" "}
                {job.salary}
              </li>
            </ul>

            <div className="userJob-actions">
              <button
                className="user-job-btn userJob-edit-btn"
                onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button
                className="user-job-btn userJob-delete-btn"
                onClick={showDeleteWarningHandler}
                disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <Modal
        show={showDeleteModal}
        onCancel={cancelDeleteWarningHandler}
        header="Delete Application?"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }>
        <p>This action cannot be undone. Are you sure you want to continue?</p>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
    </div>
  );
};

export default ShowUserJob;
