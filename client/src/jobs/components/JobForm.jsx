import React from "react";

import Input from "../../shared/components/Input";

const JobForm = (props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <form>
      {isEditing ? (
        <Input
          id="description"
          type="text"
          element="textarea"
          label="Job Description"
          placeholder="Enter job description"
          required
          value={props.jobData.description || ""}
        />
      ) : (
        <Input
          id="title"
          type="text"
          label="Job Title"
          placeholder="Enter job title"
          required
          value={props.jobData.title || ""}
          disabled
        />
      )}
    </form>
  );
};

export default JobForm;
