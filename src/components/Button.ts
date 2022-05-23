// @ts-ignore
import shader from 'shader';
import styled from 'styled-components';
import { Theme } from '../styles';

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: 8px;
  min-width: 250px;

  color: #FFFFFF;
  border: 0;
  border-radius: 5px;
  
  font-size: 24px;
  font-style: normal;
  font-family: 'Poppins';
  text-align: center;
  
  background: ${({ theme, color = 'blue' }) => theme.color[color]};
  
  &:active {
    background: ${({ theme, color = 'blue' }) =>
      shader(theme.color[color], 0.3)};
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.color.lightGray};
  }
`;

interface ButtonProps {
  color?: keyof Theme['color'];
}
