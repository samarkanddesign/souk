import * as React from 'react';
import styled, { css } from 'react-emotion';
import { spacing, typeSize, greys } from './style';

interface InputStyleProps {
  hasError?: boolean;
}

export const baseInputStyle = ({ hasError }: InputStyleProps) => css`
  display: block;
  width: 100%;
  border: 1px solid;
  border-color: ${hasError ? 'red' : greys.e};
  border-radius: 4px;
  padding: ${spacing.cat};
  background: hsl(22, 12%, 98%);
  font-size: inherit;
  &:hover {
    background: hsl(22, 12%, 95%);
  }
  &:focus {
    background: hsl(22, 12%, 93%);
  }
  transition: all 0.2s ease;
`;

const LabelContainer = styled('span')`
  margin-bottom: ${spacing.ant};
  display: inline-block;
`;

const Error = styled('p')`
  color: red;
  font-size: ${typeSize.crab};
  margin: ${spacing.cat} 0 0;
`;

export const StyledInput = styled('input')`
  ${(props: InputStyleProps) => baseInputStyle({ hasError: props.hasError })};
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error?: string | {};
}

export const Input = ({ label, error, ref, ...inputProps }: Props) => {
  return (
    <div>
      <label>
        <LabelContainer>{label}</LabelContainer>

        <StyledInput {...inputProps} hasError={!!error} />
      </label>
      {error ? <Error>{error}</Error> : null}
    </div>
  );
};

export default Input;
