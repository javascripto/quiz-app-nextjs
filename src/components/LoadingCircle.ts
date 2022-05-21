import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  100% { transform: rotate(360deg); }
`;

export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.color.lightGray};
  background: transparent;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.color.blue};
  animation: ${spin} .5s linear infinite;
`;
