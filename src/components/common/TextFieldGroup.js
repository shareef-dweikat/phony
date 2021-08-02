/** @format */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  lable,
  error,
  info,
  type,
  onChange,
  disable,
  style,
  required
}) => {
  const validateNumber = (event) => {
    event.target.value = event.target.value.replace(/\D/,'');
    onChange(event);
  };

  return (
    <div className="form-group">
      {type === "number" ? (
        <input
        //  id="exampleFormControlInput1"
        type="text"
        pattern="[0-9]*"
        className={classnames("form-control form-control-lg rounded input-field", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={validateNumber}
        disabled={disable}
        style={style}
        required={required}
      />
      ) : (
      <input
        //  id="exampleFormControlInput1"
        type={type}
        className={classnames("form-control form-control-lg rounded input-field", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disable}
        style={style}
        required={required}
      />
      )}
      
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (
        <small className="form-text text-muted text-left">
          {typeof error === "object" ? "" : error}
        </small>
      )}
      {error && <div className="invalid-feedback"></div>}
    </div>
  );
};
TextFieldGroup.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  lable: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.string,
};
TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
