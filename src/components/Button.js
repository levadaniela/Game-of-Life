import React from "react";

const Button = ({ onClickFn, name }) => {
  return (
    <div>
      <button onClick={onClickFn} name={name}>
        {name}
      </button>
    </div>
  );
};

export default Button;
