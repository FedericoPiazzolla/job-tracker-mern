import React, { useEffect, useReducer, useState } from "react";
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
        isTouch: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputSate, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouch: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { id } = props;
  const { value, isValid } = inputSate;

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  let element;
  if (props.element === "select") {
    element = (
      <select
        id={props.id}
        value={inputSate.value}
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
    element = (
      <div className="input-password-wrapper">
        <input
          id={props.id}
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputSate.value}
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
  } else if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputSate.value}
      />
    );
  } else {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || "3"}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputSate.value}
      />
    );
  }

  return (
    <div
      className={`form-control ${
        !inputSate.isValid && inputSate.isTouch && "form-control--invalid"
      }`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputSate.isValid && inputSate.isTouch && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
