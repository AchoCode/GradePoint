import React, { useState, useRef } from "react";
import { InputField } from "../Utilities/InputField";
import { Button } from "../Utilities/Button";
import { ReportSheet } from "../Utilities/ReportSheet";
import PlaceholderImg from "../../assets/Static/placeholder.png";
import { useResponsive } from "../../useResponsive";
import { toast } from "react-toastify";
import api from "../../api";
import { Loader } from "../Utilities/Loader";

export const CheckResult = () => {
  const [liveResult, setLiveResult] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [cardNo, setcardNo] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [subjectGrades, setSubjectGrades] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);

  const guidelines = [
    "Each scratch card can only be used by one student",
    "Each scratch card is valid for 7 days and can be used 5 times",
    "Please ensure to enter a valid scratch card number and student reg no.",
  ];

  const breakpoints = useResponsive([600, 900, 1200]);
  const reportSheetRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    setResultLoading(true);
    if (!regNo || !cardNo) {
      return toast.error("Sorry. Can not process empty fields");
    }
    try {
      const response = await api.post("/api/result", {
        regNo: regNo,
        cardNo: cardNo,
      });

      if (response.status !== 200) {
        toast.error(response.data.e_msg);
      } else {
        const apiData = response.data;

        setStudentData(apiData.payload);
        setSubjectGrades(apiData.payload.result);
        setLiveResult(true);
        toast.success("Student result fetched successfully");

        if (breakpoints == 0 && reportSheetRef.current) {
          reportSheetRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      let errorMsg = "Sorry. Something went wrong.";

      if (error.response && error.response.data && error.response.data.e_msg) {
        errorMsg = error.response.data.e_msg;
      }
      toast.error(errorMsg);
      console.log(error);
    } finally {
      setResultLoading(false);
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
          <InputField
            value={cardNo}
            type="text"
            label="Scratch card number"
            onChange={(e) => setcardNo(e.target.value)}
          />
          <InputField
            value={regNo}
            type="text"
            label="Student registration number"
            onChange={(e) => setRegNo(e.target.value)}
          />
          <Button type="submit" title="Check result" />
        </form>
      </div>
      {!liveResult ? (
        <div className="placeholder-container">
          {!resultLoading ? (
            <>
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
            </>
          ) : (
            <Loader loading={true} grading text="Fetching student Result" />
          )}
        </div>
      ) : (
        <div
          style={
            breakpoints == 0
              ? { width: "100%", padding: "0 15px" }
              : { width: "50%" }
          }
          ref={reportSheetRef}
        >
          <ReportSheet
            studentData={studentData}
            subjectGrades={subjectGrades}
          />
        </div>
      )}
    </div>
  );
};
