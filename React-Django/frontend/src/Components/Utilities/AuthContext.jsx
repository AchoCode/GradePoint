import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();
// Provide the context
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = (token) => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const fetchStudents = async (setLoading) => {
    setLoading(true);
    try {
      const response = await api.get("/api/fetch-students");

      if (response.status != 200) {
        toast.error("error fetching data");
      } else {
        setStudentList(response.data.payload.students);
        toast.success("Student fetch succesful.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, logout, checkLoginStatus, fetchStudents }}
    >
      {children}
    </AuthContext.Provider>
  );
};
