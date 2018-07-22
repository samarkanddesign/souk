import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage';

import ShopPage from './pages/ShopPage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import styled, { injectGlobal } from 'react-emotion';
import { spacing } from './components/style';
import ProductPage from './pages/ProductPage';
import Basket from './components/Basket';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }
`;

const Wrapper = styled('div')`
  max-width: 64rem;
  margin: 0 auto;
  padding: ${spacing.lion};
`;

const App = () => (
  <Wrapper>
    <Basket />

    <Navbar />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/product/:slug" component={ProductPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </Wrapper>
);

export default App;
