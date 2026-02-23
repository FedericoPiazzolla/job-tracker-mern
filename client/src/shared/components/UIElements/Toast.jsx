import React from "react";
import "./style/Toast.css";

const Toast = (props) => {
  if (!props.message) return null;

  return (
    <div className={`toast toast--${props.type || "success"}`} role="status">
      {props.message}
    </div>
  );
};

export default Toast;
