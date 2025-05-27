import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";

const JobForm = ({ job = {}, onCancel, onSave, mode = "create" }) => {
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    website: job.website || "",
    company: job.company || "",
    location: job.location || "",
    status: job.status || "",
    date: job.date || "",
    salary: job.salary || "",
    creator: job.creator || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {mode === "create" && (
        <>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            label="Title"
          />
          <Input
            id="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            label="Company"
          />
          <Input
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            label="Location"
          />
          <Input
            id="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
            label="Website"
          />
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            label="Date"
          />
        </>
      )}
      {/* Questi campi sono sempre visibili in edit e create */}
      <Input
        id="description"
        type="text"
        element="textarea"
        value={formData.description}
        onChange={handleChange}
        label="Description"
      />
      <Input
        id="salary"
        type="text"
        value={formData.salary}
        onChange={handleChange}
        label="Salary"
      />
      <Input
        id="status"
        type="text"
        value={formData.status}
        onChange={handleChange}
        label="Status"
      />
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default JobForm;
