import React from "react";

export const InputField = ({ label, value, onChange, readOnly, required, className }) => {
  return (
    <div className="input-field">
      <input
        type="text"
        value={value}
        onChange={(event)=>onChange(event)}
        readOnly={readOnly}
        placeholder={label}
        required={required}
        className={`form-field ${className? className : ''}`}
      />
    </div>
  );
};
