import React from "react";

export const ReportSheet = ({ studentData, subjectGrades }) => {
  return (
    <div className="result-display">
      <div className="result-table">
        <div className="student-details">
          <h3 className="heading">Student details</h3>
          <div className="name-info">
            <h4>Student name :</h4>
            <p>{studentData.name_of_student}</p>
          </div>
          <div className="name-info">
            <h4>Registration Number :</h4>
            <p>{studentData.reg_number}</p>
          </div>
          <div className="scores">
            <div className="name-info">
              <h4>Average :</h4>
              <p>{studentData.Average}</p>
            </div>
            <div className="name-info">
              <h4>Total score :</h4>
              <p>{studentData.overall_score}</p>
            </div>
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
              {subjectGrades.map((element) => (
                <tr key={element}>
                  <td style={{ textAlign: "start" }}>{element.subject}</td>
                  <td>{element.test_score}</td>
                  <td>{element.exam_score}</td>
                  <td>{element.total_score}</td>
                  <td>{element?.grade || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
            
          <div className="card-info">
            <span>Card use : {studentData.card_usage_count} of 5 </span>
          </div>
        </div>
      </div>
    </div>
  );
};
