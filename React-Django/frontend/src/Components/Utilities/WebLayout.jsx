import React from "react";

export const WebLayout = ({ navbar, contentArea }) => {
  return (
    <div style={{ height: "99vh", overflow: "hidden" }}>
      <div>{navbar}</div>
      {contentArea}
    </div>
  );
};
