import React, { useState } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { ReportSheet } from "../Utilities/ReportSheet";
import PlaceholderImg from "../../assets/Static/placeholder.png";
import { useResponsive } from "../../useResponsive";
import { toast } from "react-toastify";
import api from "../../api";

export const CheckResult = () => {
  // const [studentData, setStudentData] = useState({});
  const [liveResult, setLiveResult] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [cardNo, setcardNo] = useState("");

  const studentData = {
    student: "Mike ejiaha",
    totalScore: "500",
    average: "97.0",
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

  const breakpoints = useResponsive([600, 900, 1200]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!regNo || !cardNo) {
      return toast.error("Sorry. Can not process empty fields");
    }
    try {
      const response = await api.post("/api/result", {
        regNo: regNo,
        cardNo: cardNo,
      });

      if (response.status != 200) {
        toast.error("something went wrong!");
      } else {
        const apiData = response.data;

        toast.success("Student result fetched successfully");
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className={`results-section ${breakpoints === 0 && "responsive"}`}>
      <div className="scratch-card-box">
        <div className="text-info">
          <ul>
            {guidelines.map((guideline) => (
              <li key={guideline}>{guideline}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <h4>Enter student and card details</h4>
          <InputField type="text" label="Scratch card number" />
          <InputField type="text" label="Student registration number" />
          <Button type="submit" title="Check result" />
        </form>
      </div>
      {!liveResult ? (
        <div className="placeholder-container">
          <img
            src={PlaceholderImg}
            className="placeholder-img"
            alt="image"
            loading="lazy"
          />
          <div className="text">
            <h4>No data available</h4>
            <p>Results will be shown when student data is fetched</p>
          </div>
        </div>
      ) : (
        <>
          <ReportSheet
            studentData={studentData}
            subjectGrades={subjectGrades}
          />
        </>
      )}
    </div>
  );
};
