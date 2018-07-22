import styled from 'react-emotion';

const buttonColor = '#333';

export const Button = styled('button')`
  padding: 1rem 2rem;
  background-color: ${buttonColor};
  border: 2px solid ${buttonColor};
  &:hover {
    background-color: #444;
    border-color: #444;
  }
  border-radius: 0.5rem;
  cursor: pointer;
  color: #fff;
  font-size: 100%;
`;

export const TextButton = styled('button')`
  background: transparent;
  cursor: pointer;
  border-style: none;
`;
