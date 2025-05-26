import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";

const JobForm = ({ job = {}, onCancel, onSave }) => {
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

  const handleInput = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title"
        type="text"
        value={formData.title}
        onInput={handleInput}
      />
      <Input
        id="description"
        type="text"
        element="textarea"
        value={formData.description}
        onInput={handleInput}
      />
      <button type="submit">Save</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default JobForm;
