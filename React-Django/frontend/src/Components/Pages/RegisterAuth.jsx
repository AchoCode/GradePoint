import React, { useEffect, useState } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const RegisterAuth = () => {
  const [usrEmail, setUsrEmail] = useState("");
  const [usrName, setUsrName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [usrPassword, setUsrPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (usrPassword != confirmPwd) {
      setNotValid(true);
    } else {
      setNotValid(false);
    }
  }, [usrPassword, confirmPwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("pressed it");
  };

  const handleAnimate = (event) => {
    usrEmail == "" || usrName == ""
      ? (setAnimate(false),
        toast.error("Please enter User name and email address"))
      : setAnimate(true);
  };
  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="heading">
          <FaUser />
          <h1>Register</h1>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <motion.div
            animate={animate ? { x: -230 } : {}}
            transition={{ duration: 0.2 }}
            className="form-container"
            >
            <span>step 1 of 2</span>
            <InputField
              type="email"
              label="Email address"
              value={usrEmail}
              onChange={(e) => setUsrEmail(e.target.value)}
            />
            <InputField
              type="text"
              label="Username"
              value={usrName}
              onChange={(e) => setUsrName(e.target.value)}
            />
            <Button type="button" title="Next" handleOnClick={handleAnimate} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate ? { x: -230, opacity: 1 } : {}}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="form-container"
          >
            <p>Step 2 of 2</p>
            <InputField
              type="text"
              label="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <div className="input-box">
              <InputField
                type="password"
                label="Password"
                value={usrPassword}
                onChange={(e) => setUsrPassword(e.target.value)}
              />
              <InputField
                type="password"
                label="Confirm password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                parentClass={notValid ? "not-valid" : ""}
              />
            </div>
            <Button type="submit" title="Register user" />
          </motion.div>
        </form>
        <div className="register-link">
          <span>
            Already have an account? <Link to="/login-auth">Click here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
