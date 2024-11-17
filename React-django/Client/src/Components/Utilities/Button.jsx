import React from "react";

export const Button = ({secondary, title, link, type, handleOnClick, }) => {
  return (
    <div
      className={secondary ? `btn-container secondary` : `btn-container`}
    >
      {link ? (
        <a className="btn" href={link}>
          {title}
        </a>
      ) : (
        <button
          type={type}
          onClick={() => {
            handleOnClick();
          }}
          className="btn"
        >
          {title}
        </button>
      )}
    </div>
  );
};
