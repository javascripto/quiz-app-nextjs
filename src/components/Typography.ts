import styled, { css } from 'styled-components';

import { Theme } from '../styles';

interface TypographyProps {
  color?: keyof Theme['color'];
  variant?: 'default' | 'title' | 'subtitle';
}

export const Typography = styled.span<TypographyProps>`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  
  ${({ variant }) =>
    ({
      title: css`
        font-size: 32px;
        line-height: 48px;
      `,
      subtitle: css`
        font-size: 20px;
        line-height: 30px;
      `,
      default: css`
        font-size: 16px;
        line-height: 24px;
      `,
    }[variant ?? 'default'] ??
    css`
      font-size: 16px;
      line-height: 24px;
    `)}

  color: ${({ theme }) => theme.color.black};

  ${({ theme, color }) => color && css`color: ${theme.color[color]};`}

`;
