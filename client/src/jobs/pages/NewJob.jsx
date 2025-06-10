import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./style/NewJob.css";

const NewJob = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const handleSave = async (newJob) => {
    try {
      // Invia la richiesta POST al backend
      const responseData = await sendRequest(
        `http://localhost:5010/api/jobs`,
        "POST",
        JSON.stringify(newJob),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      // Reindirizza alla pagina del nuovo job usando l'id reale
      navigate(`/${auth.userId}/jobs/${responseData.job.id}`);
    } catch (err) {
      // Gestisci eventuali errori qui
      console.error("Errore creazione job:", err);
    }
    console.log("Dati inviati al backend:", newJob);
  };

  return (
    <div className="userJob-container">
      <div className="userJob-list">
        <JobForm mode="create" onSave={handleSave} />
      </div>
    </div>
  );
};

export default NewJob;
