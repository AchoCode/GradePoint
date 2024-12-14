import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/gpLogoWhite.png";
import { Button } from "./Button";
import { AuthContext } from "./AuthContext";
import { ACCESS_TOKEN } from "../../Constants";

export const Navbar = ({ login }) => {
  const { loggedIn, checkLoginStatus, logout} = useContext(AuthContext);
  const token = localStorage.getItem(ACCESS_TOKEN);
  
  useEffect(()=>{
    checkLoginStatus(token)
  }, [])
  return (
    <div className="nav-container">
      <img src={Logo} alt="logo" className="logo" />
      <ul>
        <li className="navlinks">
          <Link to="/">Home</Link>
        </li>
        <li className="navlinks">
          <Link to="/about-us">About us</Link>
        </li>
        <li className="navlinks">
          <Link to="/contact-us">Contact</Link>
        </li>
        {!loggedIn ? (
          <>
            <li className="navlinks btn login">
              <Link to="/login-auth">Login</Link>
            </li>

            <li className="navlinks btn register">
              <Link to="/register-auth">Register</Link>
            </li>
          </>
        ) : (
          <li className="navlinks btn register">
            <Button title="Logout" handleOnClick={logout} />
          </li>
        )}
      </ul>
    </div>
  );
};
