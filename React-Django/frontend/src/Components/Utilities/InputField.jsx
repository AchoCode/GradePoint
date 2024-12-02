import React from "react";

export const InputField = ({
  type = "text",
  label,
  value,
  onChange,
  readOnly = false,
  required = false,
  className,
  parentClass,
}) => {
  return (
    <div className={parentClass ? `input-field ${parentClass}` : "input-field"}>
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
