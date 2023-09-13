import React from 'react';
import styled from '@emotion/styled';
interface Props{
  backgroundColor?:string;
  children?:React.ReactNode
}

const AlertContainer = styled.div<Props>`
  padding: 15px;
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;


const Alert = ({ children, backgroundColor = 'red' }:Props) => {
  return (
    <AlertContainer backgroundColor={backgroundColor}>
      {children}
    </AlertContainer>
  );
};

export default Alert;
