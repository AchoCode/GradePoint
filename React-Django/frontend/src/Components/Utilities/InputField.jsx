import React from "react";

export const InputField = ({
  type = "text",
  label,
  value,
  onChange,
  readOnly = false,
  required = false,
  className,
}) => {
  return (
    <div className="input-field">
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
        readOnly={readOnly}
        placeholder={label}
        required={required}
        className={`form-field ${className ? className : ""}`}
      />
    </div>
  );
};
