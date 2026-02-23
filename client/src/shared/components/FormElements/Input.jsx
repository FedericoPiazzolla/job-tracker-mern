import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validate } from "../../util/validators";
import "./style/Input.css";

const Input = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { id, value = "", onInput, validators = [], type, element } = props;
  const isValid = validate(value, validators);

  const changeHandler = (event) => {
    const enteredValue = event.target.value;
    const enteredValueIsValid = validate(enteredValue, validators);

    if (onInput) {
      onInput(id, enteredValue, enteredValueIsValid);
    }
  };

  const touchHandler = () => {
    setIsTouched(true);
  };

  let inputElement;
  if (element === "select") {
    inputElement = (
      <select
        id={id}
        value={value}
        onChange={changeHandler}
        onBlur={touchHandler}>
        {props.options &&
          props.options.map((opt) => (
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
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
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
        rows={props.rows || "3"}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
        placeholder={props.placeholder}
      />
    );
  } else {
    inputElement = (
      <input
        id={id}
        type={type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    );
  }

  return (
    <div
      className={`form-control${
        !isValid && isTouched ? " form-control--invalid" : ""
      }`}>
      <label htmlFor={id}>{props.label}</label>
      {inputElement}
      {!isValid && isTouched && props.errorText && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
