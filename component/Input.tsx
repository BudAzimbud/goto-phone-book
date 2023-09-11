import React, { useState } from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const EmotionInputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size:0.8rem;
`;

const IconContainer = styled.div`
  margin-left: 10px;
`;


const EmotionInput = ({icon,...props}) => {
  const [emotion, setEmotion] = useState('');

  return (
    <InputContainer>
      <EmotionInputField
       {...props}
      />
      <IconContainer>
        {icon}
      </IconContainer>
    </InputContainer>
  );
};

export default EmotionInput;
