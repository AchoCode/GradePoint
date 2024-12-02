import React from "react";
import { Link } from "react-router-dom";
export const Button = ({
  title,
  link,
  type = "button",
  handleOnClick = () => {},
  styling,
}) => {
  return (
    <div className={styling ? `btn-container ${styling}` : `btn-container`}>
      {link ? (
        <Link className="btn" to={link}>
          {title}
        </Link>
      ) : (
        <button
          type={type}
          onClick={(event) => {
            handleOnClick(event);
          }}
          className="btn"
        >
          {title}
        </button>
      )}
    </div>
  );
};
