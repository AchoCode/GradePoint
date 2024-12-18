import React from "react";
import { Button } from "../Utilities/Button";

export const SideNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Nursery",
    "Primary",
    "Secondary",
    "Students",
    "Cards",
    "Settings",
    "Profile",
  ];

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
