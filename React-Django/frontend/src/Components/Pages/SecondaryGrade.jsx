import React from "react";
import { GradingComponent } from "../Utilities/GradingComponent";
export const SecondaryGrade = ({ activeTab }) => {
  const subjects = [
    "MATHEMATICS",
    "ENGLISH LANGUAGE",
    "ASUSU IGBO",
    "CIVIC EDUCATION",
    "BASIC TECHNOLOGY",
    "CHRISTAIN RELIGIOUS STUDIES",
    "PHYSICAL AND HEALTH EDUCATION",
    "COMPUTER SCIENCE",
    "HOME ECONOMICS",
    "BUSINESS STUDIES",
    "AGRICULTURAL SCIENCE",
    "BASIC SCIENCE",
    "CULTURAL & CREATIVE ARTS",
    "SOCIAL STUDIES",
    "LITERATURE",
    "HISTORY",
  ];

  return (
    <>
      <GradingComponent activeTab={activeTab} subjects={subjects} />
    </>
  );
};
