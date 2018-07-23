import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;
`;

export const ProductLink = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => <StyledLink to={`/product/${slug}`}>{children}</StyledLink>;
