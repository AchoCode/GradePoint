import React, { useState } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

export const LoginAuth = () => {
  const [usrEmail, setUsrEmail] = useState("");
  const [usrPassword, setUsrPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("pressed it");
  };
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="heading login">
          <FaUser />
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            label="Enter user email address"
            value={usrEmail}
            onChange={(e) => setUsrEmail(e.target.value)}
          />
          <InputField
            type="password"
            label="Enter password"
            value={usrPassword}
            onChange={(e) => setUsrPassword(e.target.value)}
          />
          <Button type="submit" title="Login user" />
        </form>
        <div className="register-link">
          <span>
            Don't have an account? <Link to="/register-auth">Click here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
