import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/gpLogoWhite.png";
export const Navbar = () => {
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
        <li className="navlinks btn login">
          <Link to="/login-auth">Login</Link>
        </li>
        <li className="navlinks btn register">
          <Link to="/register-auth">Register</Link>
        </li>
      </ul>
    </div>
  );
};
