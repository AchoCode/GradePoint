import React, { useContext, useEffect, useState } from "react";
import { SideNav } from "./SideNav";
import { NurseryGrade } from "../Pages/NurseryGrade";
import { SecondaryGrade } from "../Pages/SecondaryGrade";
import { PrimaryGrade } from "../Pages/PrimaryGrade";
import { ScratchCardPage } from "../Pages/ScratchCardPage";
import { ManageStudents } from "../Pages/ManageStudents";
import { useLocation } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { Settings } from "../Pages/Settings";
import { Profile } from "../Pages/Profile";

export const GradingTab = () => {
  //initialize location object and use it to get the url params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  //sets to the param or nursery if no param is found
  const defaultTab = queryParams.get("tab") || "Nursery";
  const [activeTab, setActiveTab] = useState(defaultTab);

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
        {activeTab == "Cards" && (
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
        {activeTab == "Settings" && (
          <div>
            
              <Settings activeTab={activeTab} />

          </div>
        )}
        {activeTab == "Profile" && (
          <div>
            <ProtectedRoute>
              <Profile activeTab={activeTab} />
            </ProtectedRoute>
          </div>
        )}
      </div>
    </div>
  );
};
