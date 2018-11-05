import * as React from 'react';
import styled from 'react-emotion';
import { spacing, greys, palette } from './style';

interface OwnProps {
  children: React.ReactNode;
  id: string;
}
type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> &
  OwnProps;

const ChoiceWrapper = styled('div')`
  display: flex;
  label {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    border-radius: ${spacing.ant};
    padding: ${spacing.cat};
    > :not(:first-child) {
      margin-left: ${spacing.cat};
    }
    &:hover {
      background: ${greys.h};
    }
  }

  > input {
    display: none;

    &:checked + label {
      background: ${greys.g};
      > div:first-child {
        background: ${palette.ui.green};
      }
    }
  }
`;

const Spot = styled('div')`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${greys.e};
`;

export const Choice = ({ children, id, ...inputProps }: Props) => {
  return (
    <ChoiceWrapper>
      <input {...inputProps} id={id} type="radio" />
      <label htmlFor={id}>
        <Spot />

        {children}
      </label>
    </ChoiceWrapper>
  );
};

export default Choice;
