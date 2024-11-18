import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../Utilities/Navbar";
import { Button } from "../Utilities/Button";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const handleCloseModal = (event) => {
    //checks if click is outside the conatainer modal
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  const handleChooseGrade = (event) => {
    event.stopPropagation(); //stops the button click from triggering the event listener
    setIsVisible(true);
  };
  useEffect(() => {
    //global add event listener
    document.addEventListener("click", handleCloseModal);

    return () => {
      // Remove event listener
      document.removeEventListener("click", handleCloseModal);
    };
  }, [isVisible]);
  return (
    <div className="page-container">
      <Navbar />
      <div className={`overlay ${isVisible ? "active" : ""}`}></div>
      <div className="hero-section">
        <div className="container-1">
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
      <div
        ref={containerRef}
        className={`container-2 ${isVisible ? "visible" : ""}`}
      >
        <h3>Choose your class grade</h3>
        <div className="choose-grade">
          <Link to="/nursery-grade" className="class-grade">
            Nursery grade
          </Link>
          <Link to="/primary-grade" className="class-grade">
            primary grade
          </Link>
          <Link to="/secondary-grade" className="class-grade">
            Secondary grade
          </Link>
        </div>
      </div>
    </div>
  );
};
