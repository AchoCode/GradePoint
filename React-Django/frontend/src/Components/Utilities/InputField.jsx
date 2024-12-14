import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
export const InputField = ({
  type = "text",
  label,
  value,
  onChange,
  readOnly = false,
  required = false,
  className,
  parentClass,
  pwdField = false,
}) => {
  const [hidePwd, setHidePwd] = useState(true);

  const handlePwdVisibility = () => {};
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
