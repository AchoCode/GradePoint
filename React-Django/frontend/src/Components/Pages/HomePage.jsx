import React, { useEffect, useRef, useState } from "react";
import { Button } from "../Utilities/Button";
import { Link } from "react-router-dom";
import { useResponsive } from "../../useResponsive";

export const HomePage = () => {
  const tabs = ["Nursery", "Primary", "Secondary"];
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const breakpoints = useResponsive([600, 900, 1200]);
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
    <div className={`page-container ${breakpoints === 0 && "responsive"}`}>
      <div className={`overlay ${isVisible ? "active" : ""} `}></div>
      <div className={`hero-section ${breakpoints === 0 && "responsive"}`}>
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
              type="button"
              handleOnClick={handleChooseGrade}
            />
            <Button
              title="Check results"
              link="/check-result"
              styling="secondary"
            />
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className={`container-2 ${isVisible ? "visible" : ""} ${
          breakpoints === 0 && "responsive"
        }`}
      >
        {breakpoints !== 0 ? (
          <>
            <h3>Choose your class grade</h3>
            <div className="choose-grade">
              {tabs.map((tab) => (
                <Link
                  key={tab}
                  to={`/grading?tab=${tab}`}
                  className="class-grade"
                >
                  {tab} grade
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                margin: "0 15px",
                textAlign: "center",
              }}
            >
              Sorry, you Cant access this feature on a mobile device
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
