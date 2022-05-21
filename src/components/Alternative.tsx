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
  return (
    <AlternativeContainer onClick={() => onClick(value)}>
      <Radio name="alternative" id={value} value={value} />
      <Label htmlFor={value}>{children}</Label>
    </AlternativeContainer>
  );
}
