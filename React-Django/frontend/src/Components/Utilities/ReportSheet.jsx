import React from "react";

export const ReportSheet = ({ studentData, subjectGrades }) => {
  return (
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
                <span>{studentData.totalScore}</span>
              </div>
              <div>
                <label htmlFor="">Average</label>
                <span>{studentData.average}</span>
              </div>
            </div>
          </div>
          <div className="card-info">
            <span>Card use : {studentData.cardUse} of 5 </span>
          </div>
        </div>
      </div>
    </div>
  );
};
