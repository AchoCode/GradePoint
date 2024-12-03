import React, { useEffect } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
export const CheckResult = () => {
  const studentData = {
    student: "Mike ejiaha",
    totalScore: "500",
    average: "97.0",
    remark: "Good result keep it up",
    regNo: "LPMA-2425-6879",
    school: "Light Power Majestic Academy",
    cardUse: "1",
    subjects: {
      English: {
        testScore: "30",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      Mathematics: {
        testScore: "430",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      Homec: {
        testScore: "50",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      Agric: {
        testScore: "60",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      civic: {
        testScore: "730",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      igbo: {
        testScore: "30",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      French: {
        testScore: "70",
        examScore: "60",
        totalScore: "130",
        grade: "A",
      },
      "social studies": {
        testScore: "730",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      cca: {
        testScore: "350",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
      computer: {
        testScore: "20",
        examScore: "40",
        totalScore: "60",
        grade: "b",
      },
      phe: {
        testScore: "50",
        examScore: "60",
        totalScore: "110",
        grade: "A",
      },
      History: {
        testScore: "90",
        examScore: "60",
        totalScore: "150",
        grade: "A",
      },
      "Basic science": {
        testScore: "40",
        examScore: "60",
        totalScore: "100",
        grade: "A",
      },
      "Basic technology": {
        testScore: "50",
        examScore: "60",
        totalScore: "110",
        grade: "A",
      },
      Crs: {
        testScore: "50",
        examScore: "60",
        totalScore: "110",
        grade: "A",
      },
      agric: {
        testScore: "350",
        examScore: "60",
        totalScore: "90",
        grade: "A",
      },
    },
  };
  const guidelines = [
    "Each scratch card can only be used by one student",
    "Each scratch card is valid for 7 days and can be used 5 times",
    "Please ensure to enter a valid scratch card number and student reg no.",
  ];

  const subjectGrades = studentData.subjects;

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("pressed it");
  };

  return (
    <div className="results-section">
      <div className="scratch-card-box">
        <div className="text-info">
          <h3>Guidelines</h3>
          <ul>
            {guidelines.map((guideline) => (
              <li key={guideline}>{guideline}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField type="text" label="Scratch card number" />
          <InputField type="text" label="Student registration number" />
          <Button type="submit" title="Check result" />
        </form>
      </div>

      <div className="result-display">
        <div className="result-table">
          <div className="student-details">
            <h3 className="heading">Student details</h3>
            <div className="name-info">
              <h4>Student name :</h4>
              <p>{studentData.student}</p>
            </div>
            <div className="name-info">
              <h4>Registration Number :</h4>
              <p>{studentData.regNo}</p>
            </div>
            <div className="name-info">
              <h4>School :</h4>
              <p>{studentData.school}</p>
            </div>
          </div>
          <div className="grade-information">
            <h3 className="heading">Subject Grades</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Test</th>
                  <th>Exam</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subjectGrades).map((element) => (
                  <tr key={element}>
                    <td>{element[0]}</td> <td>{element[1].testScore}</td>
                    <td>{element[1].examScore}</td>
                    <td>{element[1].totalScore}</td> <td>{element[1].grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="other-info">
              <div className="scores">
                <div>
                  <label htmlFor="">Overall total</label>
                  {studentData.totalScore}
                </div>
                <div>
                  <label htmlFor="">Average</label>
                  {studentData.average}
                </div>
              </div>
              <div className="remarks">
                <div>
                  <h5>
                    Form master's Remark <span>{studentData.remark}</span>
                  </h5>
                </div>
              </div>
              <div className="card-info">
                <span>Card use : {studentData.cardUse} of 5 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
