import React, { useEffect, useState } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import api from "../../api";

export const GradingComponent = ({ subjects, activeTab }) => {
  const [studentName, setStudentName] = useState("");
  const [average, setAverage] = useState(0);
  const [gradeTotal, setGradeTotal] = useState(0);
  // Initialize state as an object with testScore, examScore, and totalScore for each subject
  const [scores, setScores] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = {
        testScore: 12,
        examScore: 12,
        totalScore: '',
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
    try {
      const dataToSend = Object.fromEntries(
        Object.entries(scores).map(([subject, { testScore, examScore }]) => [
          subject,
          { testScore, examScore },
        ])
      );

      const endpoint = apiEndpoints[activeTab] || "/api/calculate/nursery"; //default endpoint

      const response = await api.post(endpoint, {
        payLoad: dataToSend,
        studentName: studentName,
      });

      const apiData = response.data;
      setAverage(apiData.payload["AVERAGE"]);
      setGradeTotal(apiData.payload["TOTAL SCORE"]);

      //updates total scores from api data
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
    } catch (error) {
      console.log(error);
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
            <InputField
              label="Enter student name"
              value={studentName}
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
              required={true}
              className="student-name"
            />
            <Button title="Clear" handleOnClick={handleClearGradingTable} />
            <Button title="Calculate" type="submit" />
          </div>

          <div className="grades-table">
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
            <tr>
              <td>{studentName}</td>
              <td className="result-score">{gradeTotal}</td>
              <td className="result-score">{average}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
