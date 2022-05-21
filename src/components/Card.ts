import styled, { css } from 'styled-components';

export const Card = styled.div<{ centerContent?: boolean }>`
  padding: 40px;
  max-width: 100%;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.25);


  gap: 10px;
  width: 700px;
  min-height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column;

  ${({ centerContent }) =>
    centerContent &&
    css`
    align-items: center;
    justify-content: center;
  `}
`;
