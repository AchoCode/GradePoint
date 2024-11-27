import React from "react";
import { GradingComponent } from "../Utilities/GradingComponent";
export const PrimaryGrade = ({ activeTab }) => {
  const subjects = [
    "ENGLISH LANGUAGE",
    "MATHEMATICS",
    "BASIC SCIENCE & TECHNOLOGY",
    "RELIGIOUS AND NATIONAL VALUES	",
    "PRE-VOCATIONAL STUDIES",
    "VERBAL REASONING",
    "QUANTITATIVE REASONING",
    "CULTURAL & CREATIVE ARTS",
    "ASUSU IGBO",
    "LITERATURE",
  ];

  return (
    <>
      <GradingComponent activeTab={activeTab} subjects={subjects} />
    </>
  );
};
