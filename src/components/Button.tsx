import React, { MouseEventHandler } from 'react'

import styled from "styled-components";

const Btx = styled.button`
margin-top: 5px;
font-size: 1rem;
border-radius: 5px;
display: inline-block;
padding: 7px 10px;
cursor: pointer;
background: teal;
color: #fff;
&:hover { 
    background: blue;
}
`;

type Props = {
  onClickFn: MouseEventHandler,
  name: string,
}

const Button = ({ onClickFn, name } : Props)  => {
  return (

    <div>
      <Btx onClick={onClickFn} name={name}>
        {name}
      </Btx>
    </div>
  );
};

export default Button;
