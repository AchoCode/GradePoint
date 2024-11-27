import React from "react";

export const WebLayout = ({ navbar, contentArea }) => {
  return (
    <div>
      <div>{navbar}</div>
      {contentArea}
    </div>
  );
};
