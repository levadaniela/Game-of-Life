import React from "react";

import styled from "styled-components";

const Btx = styled.button`
margin-top: 5px;
font-size: 1.3rem;
padding: 7px 10px;
color: #fff;
&:hover { 
    background: blue;
}
`;

const Button = ({ onClickFn, name }) => {
  return (
    <div>
      <Btx onClick={onClickFn} name={name}>
        {name}
      </Btx>
    </div>
  );
};

export default Button;
