import React from "react";
import { Button } from "../Utilities/Button";
import { useNavigate } from "react-router";

export const SideNav = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const tabs = [
    "Nursery",
    "Primary",
    "Secondary",
    "Students",
    "Scratch-card",
    "Settings",
    "Profile",
  ];

  const handleLogout = () => {};
  return (
    <div className="side-nav">
      {tabs.map((tab) => (
        <Button
          key={tab}
          id={tab}
          activeTab={activeTab}
          handleOnClick={() => setActiveTab(tab)}
          title={tab}
          styling={activeTab == tab ? "active" : ""}
        />
      ))}
    </div>
  );
};
