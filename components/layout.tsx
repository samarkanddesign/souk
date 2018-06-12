import * as React from 'react';
import { injectGlobal } from 'emotion';
import styled from 'react-emotion';
import Navbar from 'components/navbar';
import { spacing } from './style';

interface Props {
  children: React.ReactNode;
}

injectGlobal`
html, body {
  padding: 0;
  margin: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  box-sizing: border-box;
}
`;

const Wrapper = styled('div')`
  max-width: 64rem;
  margin: 0 auto;
  padding: ${spacing.lion};
`;

export default function Layout({ children }: Props) {
  return (
    <Wrapper>
      <header>
        <Navbar />
      </header>
      <main>
        <h1>Samarkand</h1>
        {children}
      </main>
      <footer>&copy; Samarkand Souk</footer>
    </Wrapper>
  );
}
