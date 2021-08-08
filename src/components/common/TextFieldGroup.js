/** @format */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import translate from "../../i18n/translate";
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  link,
  error,
  info,
  type,
  onChange,
  disable,
  style,
  required,
  autoFocus = false
}) => {
  const validateNumber = (event) => {
    event.target.value = event.target.value.replace(/\D/,'');
    onChange(event);
  };

  return (
    <div className="form-group" style={{width: "100%"}}>
      {label && type !== 'hidden' && (
        <label for={name}><span>{label} {required && (<i class="asterisk">*</i>)}</span>
          {link && link.url && link.text && (<a href={link.url} class="float-right">
            {link.text}
          </a>)}
        </label>
      )}

      {type === "number" ? (
        <input
          id={name}
          type="text"
          pattern="[0-9]*"
          className={classnames("form-control form-control-lg rounded input-field", {
            "is-invalid": error,
            "disabled": disable
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={validateNumber}
          disabled={disable}
          style={style}
          required={required}
          autoFocus={autoFocus}
        />
      ) : (
      <input
        id={name}
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
          {typeof error === "object" ? "" : translate(error)}
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
  label: PropTypes.string,
  link: PropTypes.object,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.string,
  autoFocus: PropTypes.bool,
};
TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
