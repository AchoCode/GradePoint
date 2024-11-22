import { GradingComponent } from "../Utilities/GradingComponent";

export const NurseryGrade = ({activeTab}) => {
  const subjects = [
    "English",
    "Mathematics",
    "Igbo",
    "Quantitative",
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
};
