import React, { useState, useEffect, useContext } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import api from "../../api";
import { Capitalize, ACCESS_TOKEN } from "../../Constants";
import { AuthContext } from "./AuthContext";

export const GradingComponent = ({ subjects, activeTab }) => {
  const [studentName, setStudentName] = useState("");
  const [average, setAverage] = useState(0);
  const [gradeTotal, setGradeTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const { loggedIn, checkLoginStatus, logout } = useContext(AuthContext);
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    checkLoginStatus(token);
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(studentName);
    console.log("====================================");
  }, [studentName]);

  const studentLevelList = studentList
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((student) => student.level === activeTab);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/fetch-students");

      if (response.status != 200) {
        toast.error("error fetching data");
      } else {
        setStudentList(response.data.payload.students);
      }
    } catch (error) {
      let errormsg = "Something went wrong. Try again.";

      // Check for API response error
      if (error.response && error.response.data && error.response.data.detail) {
        errormsg = error.response.data.detail; // Use server-provided error message
      } else if (!error.response) {
        // Handle network or unexpected errors
        toast.error(errormsg);
        console.error("Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  // Initialize state as an object with testScore, examScore, and totalScore for each subject
  const [scores, setScores] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = {
        testScore: 50,
        examScore: 50,
        totalScore: "",
        grade: "",
      };
      return acc;
    }, {})
  );

  // Handle input changes
  const handleScores = (subject, field, value) => {
    setScores((preScores) => ({
      ...preScores,
      [subject]: {
        ...preScores[subject],
        [field]: value,
      },
    }));
  };

  //defines api endpoints
  const apiEndpoints = {
    Nursery: "/api/calculate/nursery",
    Primary: "/api/calculate/primary",
    Secondary: "/api/calculate/secondary",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (studentName === "") {
        return toast.error("Please select a student");
      }

      const dataToSend = Object.fromEntries(
        Object.entries(scores).map(([subject, { testScore, examScore }]) => [
          subject,
          { testScore, examScore },
        ])
      );

      const endpoint = apiEndpoints[activeTab] || "/api/calculate/nursery"; //default endpoint

      const response = await api.post(endpoint, {
        payLoad: dataToSend,
        studentName: Capitalize(studentName),
        level: activeTab,
      });

      const apiData = response.data;

      if (apiData.error) {
        toast.error(apiData.error);
      } else {
        toast.success("Data fetch complete...");
        setAverage(apiData.payload["AVERAGE"]);
        setGradeTotal(apiData.payload["TOTAL SCORE"]);
        fetchStudents();
        // updates total scores from api data
        setScores((preScores) => {
          const updateScores = Object.keys(preScores).reduce((acc, subject) => {
            acc[subject] = {
              ...preScores[subject],
              totalScore: apiData.payload[subject]?.totalScore || "0",
              grade: apiData.payload[subject]?.grade || "",
            };
            return acc;
          }, {});

          return updateScores;
        });
      }
    } catch (error) {
      // Default error message
      let errormsg = "Something went wrong. Try again.";

      // Check for API response error
      if (error.response && error.response.data && error.response.data.error) {
        errormsg = error.response.data.error; // Use server-provided error message
      } else if (!error.response) {
        // Handle network or unexpected errors
        errormsg = "Network error. Please check your internet connection.";
      }

      // Show error notification
      toast.error(errormsg);

      // Log the complete error for debugging
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearGradingTable = () => {
    setScores((preScores) => {
      const clearedFields = Object.keys(preScores).reduce((acc, subject) => {
        acc[subject] = {
          testScore: "",
          examScore: "",
          totalScore: "",
          grade: "",
        };
        return acc;
      }, {});
      return clearedFields;
    });
    setAverage(0);
    setGradeTotal(0);
    setStudentName("");
  };

  return (
    <div className="input-container">
      <div className="grading-table-container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="cta">
            <div className="active-tab">{activeTab}</div>
            <div className="student-name-box">
              {loggedIn ? (
                <>
                  {studentLevelList.length > 0 ? (
                    <select
                      value={studentName}
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setStudentName(selectedValue);
                      }}
                    >
                      <option value="" disabled>
                        Select student
                      </option>
                      {studentLevelList.map((student, index) => (
                        <option key={index} value={student.name}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={studentName}
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setStudentName(selectedValue);
                      }}
                    >
                      <option value="" disabled>
                        Select student
                      </option>
                    </select>
                  )}
                </>
              ) : (
                <InputField
                  label="Enter student name"
                  value={studentName}
                  onChange={(event) => {
                    setStudentName(event.target.value);
                  }}
                  required={true}
                  className="student-name"
                />
              )}
            </div>

            <Button title="Clear" handleOnClick={handleClearGradingTable} />
            <Button title="Calculate" type="submit" />
          </div>

          <div className="grades-table">
            <Loader loading={loading} grading />
            <div className={`overlay ${loading ? `active` : ``} `}></div>
            {subjects.map((subject, index) => (
              <div className="input-box" key={index}>
                <h3>{subject}</h3>
                <InputField
                  label="Test"
                  value={scores[subject].testScore}
                  onChange={(e) =>
                    handleScores(subject, "testScore", e.target.value)
                  }
                  required={true}
                />
                <InputField
                  label="Exam"
                  value={scores[subject].examScore}
                  onChange={(e) =>
                    handleScores(subject, "examScore", e.target.value)
                  }
                  required={true}
                />
                <InputField
                  readOnly
                  label="Total"
                  value={scores[subject].totalScore}
                  className="read-only-field"
                />
                {activeTab === "Secondary" ? (
                  <InputField
                    readOnly
                    label="Grade"
                    value={scores[subject].grade}
                    className="read-only-field"
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Name of student</th>
              <th>Total</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(studentLevelList) && studentLevelList.length > 0 ? (
              studentLevelList.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td className="result-score">{student.overall_total}</td>
                  <td className="result-score">{student.average}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>{studentName}</td>
                <td className="result-score">{gradeTotal}</td>
                <td className="result-score">{average}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
