import React from 'react';
import Typist from 'react-text-typist';
import "./style.css";

const Typing = ({
  sentences,
  loop = false
}) => {
  return (
    <div className="pp-typing">
      <Typist sentences={sentences} loop={loop} />
    </div>
  );
};

export default Typing;
