import React from "react";
import { ScaleLoader, PulseLoader } from "react-spinners";

export const Loader = ({
  loading = false,
  grading,
  color = "white",
  top = 30,
}) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p style={{ color: color }}>Fetching data</p>
          <ScaleLoader color={color} loading={loading} />
        </div>
      ) : (
        <div className="loader-container" style={{ top: `${top}px` }}>
          <PulseLoader color={color} loading={loading} />
        </div>
      )}
    </>
  );
};
