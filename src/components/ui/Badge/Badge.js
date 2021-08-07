import React from "react";
import "./style.css";
import PropTypes from "prop-types";

const Badge = ({text}) => {
  return (
    <span class="badge position-absolute top-0 left-100 translate-middle-y bg-danger">
        {text}
    </span>
  );
};
Badge.propTypes = {
    text: PropTypes.string.isRequired,
};
export default Badge;
