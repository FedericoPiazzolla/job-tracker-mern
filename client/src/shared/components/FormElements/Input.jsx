import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style/Input.css";

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const {
    id,
    value,
    onChange,
    label,
    placeholder,
    type,
    element,
    options,
    rows,
    errorText,
    validators = [],
  } = props;

  const validFns = Array.isArray(validators)
    ? validators.filter((fn) => typeof fn === "function")
    : [];
  const isValid =
    validFns.length === 0
      ? true
      : validFns.every((validator) => validator(value));

  const handleBlur = (e) => {
    setIsTouched(true);
    if (props.onBlur) props.onBlur(e);
  };

  let inputElement;
  if (element === "select") {
    inputElement = (
      <select id={id} value={value} onChange={onChange} onBlur={handleBlur}>
        {options &&
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    );
  } else if (element === "input" && type === "password") {
    inputElement = (
      <div className="input-password-wrapper">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          value={value}
        />
        <span
          className="input-password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={0}
          aria-label={showPassword ? "Hide password" : "Show password"}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    );
  } else if (element === "textarea") {
    inputElement = (
      <textarea
        id={id}
        rows={rows || "3"}
        onChange={onChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
      />
    );
  } else {
    inputElement = (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        value={value}
      />
    );
  }

  return (
    <div
      className={`form-control${
        !isValid && isTouched ? " form-control--invalid" : ""
      }`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!isValid && isTouched && errorText && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
