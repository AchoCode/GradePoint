import React from "react";
import { Navbar } from "../Utilities/Navbar";
import { Button } from "../Utilities/Button";
export const HomePage = () => {
  const handleChooseGrade = ()=>{
    alert('pressed it now!!');

  }
  return (
    <div className="page-container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-text">
          <h2>Empowering schools</h2>
          <h1>
            Simplifying <span>Grades</span>
          </h1>
          <h3>
            Effortlessly manage grades with Grade<span>Point</span>
          </h3>
        </div>
        <div className="hero-btns">
          <Button
            title="Start grading"
            type="submit"
            handleOnClick={handleChooseGrade}
          />
          <Button title="Learn more" link="/about-us" secondary />
        </div>
      </div>
    </div>
  );
};
