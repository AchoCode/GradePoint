import { useState, useEffect, useContext } from "react";
import { GradingComponent } from "../Utilities/GradingComponent";
import api from "../../api";
import { AuthContext } from "../Utilities/AuthContext";
export const PrimaryGrade = ({ activeTab }) => {
  const [courses, setCourses] = useState([]);
  const { loggedIn } = useContext(AuthContext);

  const fetchSettings = async () => {
    let response;
    if (loggedIn) {
      try {
        response = await api.get("/api/settings");
        console.log(response);

        if (response.status != 200) {
          toast.error("something went wrong");
        } else {
          setCourses(response.data.payload.settings);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      response = JSON.parse(localStorage.getItem("settings")) || [];
      setCourses(response);
    }
  };
  useEffect(() => {
    fetchSettings();
  }, [loggedIn]);

  const subjects = courses
    .filter((course) => course.course_level === activeTab)
    .map((course) => course.course_name);

  return (
    <>
      <GradingComponent activeTab={activeTab} subjects={subjects} />
    </>
  );
};
