import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";

const NewJob = () => {
  const navigate = useNavigate();

  const handleSave = (newJob) => {
    // Qui puoi fare una chiamata API o aggiornare lo stato globale
    // Dopo il salvataggio, reindirizza alla pagina del nuovo job (qui esempio statico)
    navigate(`/u1/jobs/j1`); // Sostituisci con l'id reale del nuovo job
  };

  return (
    <div className="userJojb-container">
      <div className="userJob-list">
        <JobForm mode="create" onSave={handleSave} />
      </div>
    </div>
  );
};

export default NewJob;
