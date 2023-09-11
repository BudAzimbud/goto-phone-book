import styled from '@emotion/styled';

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export default Col;
