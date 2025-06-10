import React, { useState } from "react";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";

import "./style/JobForm.css";

const JobForm = ({ job = {}, onSave, mode = "create" }) => {
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    website: job.website || "",
    company: job.company || "",
    location: job.location || "",
    status: job.status || "applied",
    date: job.date || "",
    salary: job.salary || "",
  });

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {mode === "edit" && <h2>{formData.title}</h2>}
      {mode === "create" && (
        <>
          <Input
            id="title"
            element="input"
            type="text"
            label="Application title"
            validators={[VALIDATOR_REQUIRE()]}
            value={formData.title}
            onInput={handleChange}
            errorText="Please enter a title."
          />
          <Input
            id="company"
            element="input"
            type="text"
            label="Application company"
            validators={[VALIDATOR_REQUIRE()]}
            value={formData.company}
            onInput={handleChange}
            errorText="Please enter a company."
          />
          <Input
            id="location"
            element="input"
            type="text"
            label="Application location"
            validators={[VALIDATOR_REQUIRE()]}
            value={formData.location}
            onInput={handleChange}
            errorText="Please enter a location."
          />
          <Input
            id="website"
            element="input"
            type="text"
            label="Application website"
            value={formData.website}
            onInput={handleChange}
            errorText="Please enter a website."
          />
          <Input
            id="date"
            element="input"
            type="date"
            label="Application date"
            validators={[VALIDATOR_REQUIRE()]}
            value={formData.date}
            onInput={handleChange}
            errorText="Please enter a date."
          />
        </>
      )}
      <Input
        id="description"
        type="text"
        element="textarea"
        label="Application description"
        validators={[VALIDATOR_REQUIRE()]}
        value={formData.description}
        onInput={handleChange}
        errorText="Please enter a description."
      />
      <Input
        id="salary"
        element="input"
        type="number"
        step="0.01"
        min="0"
        label="Application salary"
        validators={[VALIDATOR_REQUIRE()]}
        value={formData.salary}
        onInput={handleChange}
        errorText="Please enter a salary."
      />
      {mode === "edit" && (
        <Input
          id="status"
          element="select"
          label="Application status"
          validators={[VALIDATOR_REQUIRE()]}
          value={formData.status}
          onInput={handleChange}
          options={[
            { value: "", label: "Select status" },
            { value: "applied", label: "Applied" },
            { value: "interviewing", label: "Interviewing" },
            { value: "offer", label: "Offer" },
            { value: "rejected", label: "Rejected" },
          ]}
          errorText="Please select a status."
        />
      )}
      <div className="form-btn-wrapper">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default JobForm;
