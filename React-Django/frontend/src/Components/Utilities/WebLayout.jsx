import React from "react";

export const WebLayout = ({ navbar, contentArea }) => {
  return (
    <div style={{ height: "100dvh", overflow: "hidden" }}>
      <div>{navbar}</div>
      {contentArea}
    </div>
  );
};
