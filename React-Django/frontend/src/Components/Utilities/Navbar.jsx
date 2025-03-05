import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Static/placeholder.png";
import { Button } from "./Button";
import { AuthContext } from "./AuthContext";
import { ACCESS_TOKEN } from "../../Constants";
import { useResponsive } from "../../useResponsive";

export const Navbar = ({ login }) => {
  const { loggedIn, checkLoginStatus, logout } = useContext(AuthContext);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const breakpoints = useResponsive([600, 900, 1200]);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    checkLoginStatus(token);
  }, []);

  return (
    <div className={`nav-container ${breakpoints === 0 && "responsive"}`}>
      <img src={Logo} alt="logo" className="logo" />

      <ul className={`${breakpoints === 0 && "responsive"}`}>
        <li className="navlinks">
          <Link to="/">Home</Link>
        </li>
        <li className="navlinks">
          <Link to="/about-us">About us</Link>
        </li>
        <li className="navlinks">
          <Link to="/contact-us">Contact</Link>
        </li>
        {breakpoints !== 0 && (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};
