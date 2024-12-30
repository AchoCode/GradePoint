import React from "react";
import { ScaleLoader, PulseLoader, BarLoader } from "react-spinners";

export const Loader = ({
  loading = false,
  grading,
  color = "white",
  top = 30,
  text = 'Fetching data'
}) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p style={{ color: color }}>{text}</p>
          <ScaleLoader color={color} loading={loading} />
        </div>
      ) : (
        <div className="loader-container" style={{ top: `${top}px` }}>
          <BarLoader color={color} loading={loading} width={500}/>
        </div>
      )}
    </>
  );
};
