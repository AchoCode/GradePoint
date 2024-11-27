import { GradingComponent } from "../Utilities/GradingComponent";

export const NurseryGrade = ({ activeTab }) => {
  const subjects = [
    "ENGLISH",
    "MATHEMATICS",
    "IGBO",
    "QUANTITATIVE",
    "VERBAL",
    "SOCIAL HABITS",
    "HEALTH HABITS",
    "COMPUTER",
    "CHRISTIAN RELIGIOUS STUDIES",
    "WRITING",
    "CULTURAL AND CREATIVE ARTS",
    "NURSERY SCIENCE",
  ];

  return (
    <>
      <GradingComponent activeTab={activeTab} subjects={subjects} />
    </>
  );
};
