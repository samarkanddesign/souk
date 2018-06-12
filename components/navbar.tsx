import * as React from 'react';
import Link from 'next/link';
import styled from 'react-emotion';
import { spacing } from 'components/style';

interface Props {}

const LinkContainer = styled('ul')`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  & > :not(:first-child) {
    margin-left: ${spacing.goat};
  }
`;

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}
function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
}

export default function Navbar({  }: Props) {
  return (
    <nav>
      <LinkContainer>
        <NavItem href="/">Home</NavItem>

        <NavItem href="/shop">Shop</NavItem>
      </LinkContainer>
    </nav>
  );
}
