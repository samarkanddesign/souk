import * as React from 'react';
import styled from 'react-emotion';
import { spacing, greys } from './style';

interface OwnProps {
  children: React.ReactNode;
  id: string;
}
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> &
  OwnProps;

const ChoiceWrapper = styled('div')`
  label {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: 1px solid ${greys.moonGrey};
    padding: ${spacing.cat};
  }

  > input {
    display: none;
    &:checked + label {
      background: ${greys.lightGrey};
      border-color: ${greys.gray};
    }
    & + label:hover {
      background: ${greys.nearWhite};
    }
  }
`;

export const Choice = ({ children, id, ...inputProps }: Props) => {
  return (
    <ChoiceWrapper>
      <input {...inputProps} id={id} type="radio" />
      <label htmlFor={id}>{children}</label>
    </ChoiceWrapper>
  );
};

export default Choice;
