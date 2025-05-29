import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./style/Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form className="auth-form">
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={() => {}}
              errorText="Please enter a name."
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={() => {}}
            errorText="Please enter a valid email address."
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            onInput={() => {}}
            errorText="Please enter a valid password (at least 6 characters)."
          />
          <button className="auth-btn" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="auth-toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href="#"
            className="auth-toggle-link"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin((prev) => !prev);
            }}>
            {isLogin ? "Sign up here." : "Login here."}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
