/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface ButtonProps {
  name: string;
}

const ButtonStyle = css`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const Button: React.FC<ButtonProps> = ({ name }) => {
  return <button css={ButtonStyle}>{name}</button>;
};

export default Button;
