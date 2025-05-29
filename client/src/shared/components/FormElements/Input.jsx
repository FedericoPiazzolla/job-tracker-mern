import React, { useReducer, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validate } from "../../util/validators";
import "./style/Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput, validators = [] } = props;
  const { value, isValid, isTouched } = inputState;

  useEffect(() => {
    if (onInput) {
      onInput(id, value, isValid);
    }
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  let inputElement;
  if (props.element === "select") {
    inputElement = (
      <select
        id={props.id}
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
  } else if (props.element === "input" && props.type === "password") {
    inputElement = (
      <div className="input-password-wrapper">
        <input
          id={props.id}
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
  } else if (props.element === "textarea") {
    inputElement = (
      <textarea
        id={props.id}
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
        id={props.id}
        type={props.type}
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
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {!isValid && isTouched && props.errorText && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
