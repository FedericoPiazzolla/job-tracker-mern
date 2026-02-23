import React from "react";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";

import "./style/JobForm.css";

const JobForm = ({ job = {}, onSave, mode = "create" }) => {
  const initialInputs =
    mode === "create"
      ? {
          title: { value: job.title || "", isValid: !!job.title },
          company: { value: job.company || "", isValid: !!job.company },
          location: { value: job.location || "", isValid: !!job.location },
          website: { value: job.website || "", isValid: true },
          date: { value: job.date || "", isValid: !!job.date },
          description: {
            value: job.description || "",
            isValid: !!job.description,
          },
          salary: { value: job.salary || "", isValid: !!job.salary },
          status: { value: job.status || "applied", isValid: true },
        }
      : {
          description: {
            value: job.description || "",
            isValid: !!job.description,
          },
          salary: { value: job.salary || "", isValid: !!job.salary },
          status: { value: job.status || "", isValid: !!job.status },
        };

  const initialFormValidity = Object.values(initialInputs).every(
    (input) => input.isValid
  );

  const [formState, inputHandler] = useForm(
    initialInputs,
    initialFormValidity
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      return;
    }

    const payload = Object.keys(formState.inputs).reduce((acc, key) => {
      acc[key] = formState.inputs[key].value;
      return acc;
    }, {});

    if (onSave) onSave(payload);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {mode === "edit" && <h2>{job.title}</h2>}
      {mode === "create" && (
        <>
          <Input
            id="title"
            element="input"
            type="text"
            label="Application title"
            validators={[VALIDATOR_REQUIRE()]}
            value={formState.inputs.title.value}
            onInput={inputHandler}
            errorText="Please enter a title."
          />
          <Input
            id="company"
            element="input"
            type="text"
            label="Application company"
            validators={[VALIDATOR_REQUIRE()]}
            value={formState.inputs.company.value}
            onInput={inputHandler}
            errorText="Please enter a company."
          />
          <Input
            id="location"
            element="input"
            type="text"
            label="Application location"
            validators={[VALIDATOR_REQUIRE()]}
            value={formState.inputs.location.value}
            onInput={inputHandler}
            errorText="Please enter a location."
          />
          <Input
            id="website"
            element="input"
            type="text"
            label="Application website"
            value={formState.inputs.website.value}
            onInput={inputHandler}
            errorText="Please enter a website."
          />
          <Input
            id="date"
            element="input"
            type="date"
            label="Application date"
            validators={[VALIDATOR_REQUIRE()]}
            value={formState.inputs.date.value}
            onInput={inputHandler}
            errorText="Please enter a date."
          />
        </>
      )}
      <Input
        id="description"
        type="text"
        element="textarea"
        label="Application description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        value={formState.inputs.description.value}
        onInput={inputHandler}
        errorText="Please enter a description of at least 5 characters."
      />
      <Input
        id="salary"
        element="input"
        type="number"
        step="0.01"
        min="0"
        label="Application salary"
        validators={[VALIDATOR_REQUIRE()]}
        value={formState.inputs.salary.value}
        onInput={inputHandler}
        errorText="Please enter a salary."
      />
      {mode === "edit" && (
        <Input
          id="status"
          element="select"
          label="Application status"
          validators={[VALIDATOR_REQUIRE()]}
          value={formState.inputs.status.value}
          onInput={inputHandler}
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
        <button type="submit" disabled={!formState.isValid}>
          Save
        </button>
      </div>
    </form>
  );
};

export default JobForm;
