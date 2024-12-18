import React from "react";
import { FadeLoader, PulseLoader } from "react-spinners";

export const Loader = ({
  loading = false,
  grading,
  color = "white",
}) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p>Fetching data</p>
          <FadeLoader color={color} loading={loading} />
        </div>
      ) : (
        <div className="loader-container" style={{top:30}}>
          <PulseLoader
            color={color}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};
