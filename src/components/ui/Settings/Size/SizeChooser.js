import React, { useState } from "react";
import translate from "../../../../i18n/translate";
import Dropdown from 'react-dropdown';

const options = [
  { value: 'default', label: translate('Default') },
  { value: 'column3', label: translate('column3') },
  { value: 'column4', label: translate('column4') },
  { value: 'column6', label: translate('column6') },
];

const SizeChooser = ({type="dropdown"}) => {
  const [size, setSize] = useState(localStorage.size)

  const getDefaultSize = () => {
    return options.find((op) => op.value === localStorage.size);
  }
  const _onSelectSize = (e) => {
    let newSize = e.value;
    if (e.target) {
      newSize = e.target.value;
    }
    localStorage.setItem("size", newSize);
    window.location.reload();
  }

  return (
    <>
      {type === "dropdown" && (
        <Dropdown
          options={options}
          onChange={_onSelectSize}
          value={getDefaultSize()}
          placeholder="Size"
          className='style1'/>
      )}
      {type === "radio" && (
        <div className="size-options">
          {options.map((op) => (
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="size"
                value={op.value}
                id={op.value}
                checked={size === op.value}
                onChange={_onSelectSize}
              />
              <label className="form-check-label" for={op.value}>
                {op.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default SizeChooser;