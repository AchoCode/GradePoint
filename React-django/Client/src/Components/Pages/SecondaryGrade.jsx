import React from 'react'
import { GradingComponent } from '../Utilities/GradingComponent';
export const SecondaryGrade = ({activeTab}) => {
  const subjects = [
    "English",
    "Mathematics",
    "Igbo",
    "History",
    "Verbal",
    "Social habits",
    "Health habits",
    "Computer",
    "Christian religious studies",
    "Writing",
    "Cultural and creative arts",
    "Nursery science",
  ];

  return (
    <>
    <GradingComponent activeTab={activeTab} subjects={subjects} />
  </>
  );
}
