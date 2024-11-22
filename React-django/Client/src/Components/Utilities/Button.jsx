import React from "react";

export const Button = ({title, link, type='button', handleOnClick = ()=>{}, styling}) => {
  return (
    <div
      className={styling ? `btn-container ${styling}` : `btn-container`}
    >
      {link ? (
        <a className="btn" href={link}>
          {title}
        </a>
      ) : (
        <button
          type={type}
          onClick={(event) => {
            handleOnClick(event);
          }}
          className='btn'
        >
          {title}
        </button>
      )}
    </div>
  );
};
