import React from "react";
import { FadeLoader, PulseLoader } from "react-spinners";

export const Loader = ({ loading = false, grading }) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p>Fetching data</p>
          <FadeLoader color="white" loading={loading} />
        </div>
      ) : (
        <div className="loader-container">
          <PulseLoader color="white" loading={loading} style={{width: "80%", top: 40 }} />
        </div>
      )}
    </>
  );
};
