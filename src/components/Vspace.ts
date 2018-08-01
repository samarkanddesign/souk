import styled from 'react-emotion';

export const Vspace = styled('div')`
  & > :not(:first-child) {
    margin-top: 1rem;
  }
`;

export default Vspace;
