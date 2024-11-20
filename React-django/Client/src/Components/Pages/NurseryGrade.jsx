import React, { useState } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { SideNav } from "../Utilities/SideNav";
export const NurseryGrade = () => {
  const subjects = [
    "English",
    "Mathematics",
    "Igbo",
    "Quantitative",
    "Verbal",
    "Social habits",
    "Health habits",
    "Computer",
    "Christian religious studies",
    "Writing",
    "Cultural and creative arts",
    "Nursery science",
  ];

  // Initialize state as an object with testScore, examScore, and totalScore for each subject
  const [scores, setScores] = useState(
    subjects.reduce((acc, subject) => {
      acc[subject] = { testScore: "", examScore: "", totalScore: "" };
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

  const [studentName, setStudedntName] = useState("");

  const handleNameInput = (event) => {
    setStudedntName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: add form submit logic
    alert("form submitted");
  };

  const handleClearGradingTable = () => {};
  return (
    <div className="input-container">
      <SideNav />
      <div className="grading-table-container">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="cta">
            <InputField
              label="Enter student name"
              value={studentName}
              onChange={(event) => {
                handleNameInput(event);
              }}
              className="student-name"
            />
            <Button
              title="Clear"
              handleOnClick={handleClearGradingTable}
            />
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
                />
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
              <th>Total score</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mike</td>
              <td>12</td>
              <td>120.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
