import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const buttonStyles = {
  primary: css`
    background-color: #007bff;
    color: white;
  `,
  secondary: css`
    background-color: #6c757d;
    color: white;
  `,
  danger: css`
    background-color: #dc3545;
    color: white;
  `,
  success: css`
    background-color: #20bf42;
    color: white;
  `,
};

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "success";
  children?: React.ReactNode;
};

const Button = styled.button<ButtonProps>`
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px 20px; /* Padding for the button */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Cursor style on hover */
  transition: background-color 0.3s ease; /* Transition effect for background color */

  &:hover {
    background-color: black;
  }

  ${({ variant }) => buttonStyles[variant || 'primary'] || buttonStyles.primary};
`;

export default Button;
