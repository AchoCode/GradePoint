import React from "react";
import { InputField } from "../Utilities/InputField";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const CheckResult = () => {
  // const studentData = {
  //   student: "Mike ejiaha",
  //   subjects: {
  //     English: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  //     Mathematics: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  //     Homec: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  //     Agric: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  //     civic: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  //     cca: {
  //       testScore: "30",
  //       examScore: "60",
  //       totalScore: "90",
  //       grade: "A",
  //     },
  // },
  // };
  const guidelines = [
    "Enter valid scratch card number",
    "Enter student registration number",
    "Each scratch card is valid for 5 days and can be used 3 times",
  ];
  return (
    <div className="results-section">
      <div className="scratch-card-box">
        <div className="text-info">
          <ul>
            {guidelines.map((guideline) => (
              <li key={guideline}>{guideline}</li>
            ))}
          </ul>
        </div>
        
        <InputField type="text" label="Enter valid scratch card" />
        <InputField type="text" label="Student registration number" />
      </div>

      <div className="result-display">
        <div className="result-table">
          <div className="student-details">{/* holds students details */}</div>
          <div className="grade-information">
            {/* displays the grade information */}
          </div>
        </div>
      </div>
    </div>
  );
};
