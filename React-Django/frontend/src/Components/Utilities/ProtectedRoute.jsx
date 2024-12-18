import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../Constants";
import api from "../../api";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";
import PlaceholderImg from "../../assets/Static/placeholder.png";
import { AuthContext } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
      setLoading(false);
    });
  }, [loggedIn]);

  // function to refresh access token if expired
  const refreshToken = async () => {
    const RFToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: RFToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }
    // decodes the jwt to get their details
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="protected-route">
        <Loader loading={loading} grading />;
      </div>
    );
  }
  return isAuthorized ? (
    children
  ) : (
    <div className="protected-route">
      <div className="content-box">
        <img src={PlaceholderImg} className="placeholder-img" alt="image" />
        <h1>Please login to access this feature</h1>
        <Link to="/login-auth">Login</Link>
      </div>
    </div>
  );
};
