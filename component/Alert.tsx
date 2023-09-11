import React from 'react';
import styled from '@emotion/styled';

const AlertContainer = styled.div`
  padding: 15px;
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const AlertIcon = styled.span`
  font-size: 36px;
  margin-right: 10px;
  vertical-align: middle;
`;

const Alert = ({ children, backgroundColor }) => {
  return (
    <AlertContainer backgroundColor={backgroundColor}>
      {children}
    </AlertContainer>
  );
};

export default Alert;
