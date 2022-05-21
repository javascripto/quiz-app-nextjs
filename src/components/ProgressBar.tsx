import styled from 'styled-components';
import { Theme } from '../styles';

const ProgressBar = styled.span`
  width: 100%;
  height: 20px;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.lightGray};
`;

const ProgressIndicator = styled.div<ProgressProps>`
  height: 100%;
  border-radius: 20px;
  background-color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.lightBlue};
  width: ${({ progress }) => `${Math.max(0, Math.min(100, progress))}%`};
  transition: width 0.3s;
`;

export function Progress({ progress, color }: ProgressProps) {
  return (
    <ProgressBar>
      <ProgressIndicator progress={progress} color={color} />
    </ProgressBar>
  );
}

interface ProgressProps {
  progress: number;
  color?: keyof Theme['color'];
}
