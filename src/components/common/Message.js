import React from "react";
import PropTypes from "prop-types";
import translate from "../../i18n/translate";

const Message = ({ msg, type = "danger" }) => {
  return (
    <div class={`alert alert-${type}`} role="alert">
      {translate(msg)}
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Message;
