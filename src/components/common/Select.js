/** @format */
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import translate from "../../i18n/translate";
import { useIntl } from "react-intl";

const Select = ({
  name,
  placeholder,
  label,
  value,
  error,
  options,
  onChange,
  disable,
  style,
  required,
  autoFocus = false
}) => {
  const intl = useIntl();

  return (
    <div className="form-group" style={{width: "100%"}}>
        {label && (
          <label for={name}><span>{label} {required && (<i class="asterisk">*</i>)}</span></label>
        )}
        <select
            className={classnames("form-select", {
              "is-invalid": error,
              "disabled": disable
            })}
            name={name} 
            autoFocus={autoFocus}
            disabled={disable} 
            onChange={onChange}
            required={required}
            style={style}
        >
            <option value="null" selected>{placeholder}</option>
            {options.map((op) => (<option value={op.value}>{intl.formatMessage({ id: op.label })}</option>))}
        </select>
        {error && (
            <small className="form-text text-muted text-left">
              {typeof error === "object" ? "" : translate(error)}
            </small>
        )}
        {error && <div className="invalid-feedback"></div>}
    </div>
  );
};
Select.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disable: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.objectOf({
        value: PropTypes.string,
        label: PropTypes.string
    })
  )
};

export default Select;
