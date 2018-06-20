import * as React from 'react';
import styled, { keyframes } from 'react-emotion';
import { typeSize, animation } from './style';

interface Props {}

const SpinnerContainer = styled('div')`
  font-size: ${typeSize.rhino};
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    animation: ${animation.spin} 500ms infinite linear;
  }
`;

export default function({  }: Props) {
  return (
    <SpinnerContainer>
      <span>🍥</span>
    </SpinnerContainer>
  );
}
