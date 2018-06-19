import * as React from 'react';
import styled from 'react-emotion';
import { spacing } from './style';
import { Link } from 'react-router-dom';

const LinkContainer = styled('ul')`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  & > :not(:first-child) {
    margin-left: ${spacing.goat};
  }
`;
interface Props {}

export default function({  }: Props) {
  return (
    <nav>
      <LinkContainer>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </LinkContainer>
    </nav>
  );
}
