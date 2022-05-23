import { EventHandler, KeyboardEvent } from 'react';
import styled from 'styled-components';

const AlternativeContainer = styled.div`
  margin: 8px;
  input[type="radio"]:checked + label {
    background: ${({ theme }) => theme.color.blue};
  }
`;

export const Label = styled.label`
  cursor: pointer;
  display: block;
  padding: 14px;
  background: ${({ theme }) => theme.color.lightBlue};
`;

const Radio = styled.input`
  display: none;
`;

Radio.defaultProps = {
  type: 'radio',
};

export function Alternative({ onClick, children, value }: any) {
  function handleKeyPress(event: React.KeyboardEvent) {
    const label = event.target as any;
    if (event.key === 'ArrowRight') {
      label.parentElement.nextSibling?.children[1].focus();
    } else if (event.key === 'ArrowLeft') {
      label.parentElement.previousSibling?.children[1].focus();
    } else if (event.key === ' ' || event.key === 'Enter') {
      label.click();
    }
  }
  return (
    <AlternativeContainer onClick={() => onClick(value)}>
      <Radio name="alternative" id={value} value={value} />
      <Label tabIndex={1} htmlFor={value} onKeyDown={handleKeyPress}>
        {children}
      </Label>
    </AlternativeContainer>
  );
}
