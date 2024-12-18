import React, { useState, useContext, useEffect } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import api from "../../api";
import { Loader } from "../Utilities/Loader";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, REFRESH_TOKEN, Capitalize } from "../../Constants";
import { AuthContext } from "../Utilities/AuthContext";

export const LoginAuth = () => {
  const [usrName, setUsrName] = useState("");
  const [usrPassword, setUsrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (usrName == "" || usrPassword == "") {
      toast.error("Please fill in the fields!");
    } else {
      try {
        const response = await api.post("/api/token/", {
          username: Capitalize(usrName),
          password: usrPassword,
        });
        if (response.status == 200) {
          // set access and refresh tokens
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
          toast.success("Login successful.");

          setLoggedIn(true);
          navigate("/grading");
        }
      } catch (error) {
        toast.error("something went wrong. Try again!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <Loader loading={loading} />
        <div className="heading login">
          <FaUser />
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="Enter username"
            value={usrName}
            onChange={(e) => setUsrName(e.target.value)}
          />
          <InputField
            type="text"
            label="Enter password"
            value={usrPassword}
            pwdField={true}
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
