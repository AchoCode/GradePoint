import React, { useContext, useEffect, useState } from "react";
import { SideNav } from "./SideNav";
import { NurseryGrade } from "../Pages/NurseryGrade";
import { SecondaryGrade } from "../Pages/SecondaryGrade";
import { PrimaryGrade } from "../Pages/PrimaryGrade";
import { ScratchCardPage } from "../Pages/ScratchCardPage";
import { ManageStudents } from "../Pages/ManageStudents";
import { useLocation } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthContext } from "./AuthContext";

export const GradingTab = () => {
  //initialize location object and use it to get the url params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  //sets to the param or nursery if no param is found
  const defaultTab = queryParams.get("tab") || "Nursery";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const { loggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("====================================");
    console.log(loggedIn);
    console.log("====================================");
  }, [location]);

  return (
    <div className="grading-tab">
      <div className="side-nav-section">
        <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="tab-section">
        {activeTab == "Nursery" && (
          <div>
            <NurseryGrade activeTab={activeTab} />
          </div>
        )}
        {activeTab == "Secondary" && (
          <div>
            <SecondaryGrade activeTab={activeTab} />
          </div>
        )}
        {activeTab == "Primary" && (
          <div>
            <PrimaryGrade activeTab={activeTab} />
          </div>
        )}
        {activeTab == "Scratch-card" && (
          <div>
            <ProtectedRoute>
              <ScratchCardPage activeTab={activeTab} />
            </ProtectedRoute>
          </div>
        )}
        {activeTab == "Students" && (
          <div>
            <ProtectedRoute>
              <ManageStudents activeTab={activeTab} />
            </ProtectedRoute>
          </div>
        )}
      </div>
    </div>
  );
};
