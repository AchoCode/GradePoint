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

  const handlePwdVisibility = () => {
    setHidePwd(!hidePwd);
  };

  return (
    <div className={parentClass ? `input-field ${parentClass}` : "input-field"}>
      <div className="input-wrapper">
        <input
          type={pwdField && hidePwd ? "password" : type}
          value={value}
          onChange={(event) => onChange(event)}
          readOnly={readOnly}
          placeholder={label}
          required={required}
          className={`form-field ${className ? className : ""}`}
        />
        {pwdField &&
          (hidePwd ? (
            <FaEye
              onClick={handlePwdVisibility}
              className="pwd-toggle-icon"
              aria-label="Show password"
            />
          ) : (
            <FaEyeSlash
              onClick={handlePwdVisibility}
              className="pwd-toggle-icon"
              aria-label="Hide password"
            />
          ))}
      </div>
    </div>
  );
};
