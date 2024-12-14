import React from "react";
import { BarLoader, PulseLoader } from "react-spinners";

export const Loader = ({ loading = false, grading }) => {
  return (
    <>
      {grading ? (
        <div className={`loader-container grading ${!loading ? `none` : ``}`}>
          <p>Fetching data</p>
          <PulseLoader color="white" loading={loading} />
        </div>
      ) : (
        <div className="loader-container">
          <BarLoader color="green" loading={loading} style={{width: "80%" }} />
        </div>
      )}
    </>
  );
};
