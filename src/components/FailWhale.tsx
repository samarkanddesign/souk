import * as React from 'react';
import styled from 'react-emotion';

interface Props {}

const FailWhaleContainer = styled('div')`
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(180deg);
    font-size: 15rem;
  }
  text-align: center;
`;

export const FailWhale = ({  }: Props) => {
  return (
    <FailWhaleContainer>
      <span>🐳</span>
      <p>Oops! Something bad happened. We're working on it.</p>
    </FailWhaleContainer>
  );
};

export default FailWhale;
