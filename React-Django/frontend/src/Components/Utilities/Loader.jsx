import React from "react";
import { FadeLoader, PulseLoader } from "react-spinners";

export const Loader = ({
  loading = false,
  grading,
  color = "white",
  top = 40,
}) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p>Fetching data</p>
          <FadeLoader color={color} loading={loading} />
        </div>
      ) : (
        <div className="loader-container" style={{width: "80%", top: `${top}px` }}>
          <PulseLoader
            color={color}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};
