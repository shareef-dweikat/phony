import React from 'react';
import Typist from 'react-typist';
import "./style.css";

const Typing = (props) => {
  return (
    <div className="pp-typing">
      <Typist>
        {props.children}
      </Typist>
    </div>
  );
};

export default Typing;
