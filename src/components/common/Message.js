import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg }) => {
  return (
    <div
      className="alert alert-info alert-dismissible fade show d-flex  justify-content-between"
      role="alert"
    >
      <div>
        <label className="mt-2">{msg}</label>
      </div>
      <div>
        <button
          type="button"
          className="close btn btn-danger "
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
