import React from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import Home from './pages/HomePage';

import ShopPage from './pages/ShopPage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import styled, { injectGlobal } from 'react-emotion';
import { spacing } from './components/style';
import ProductPage from './pages/ProductPage';

import LoginPage from './pages/LoginPage';
import EnsureAuth from './components/EnsureAuth';
import { CheckoutPageContainer } from './pages/CheckoutPageContainer';
import { CreateAddressPage } from './pages/CreateAddressPage';
import EnsureGuest from './components/EnsureGuest';

injectGlobal`
  body,html {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const Wrapper = styled('div')`
  max-width: 64rem;
  margin: 0 auto;
  padding: ${spacing.lion};
`;

const App = () => (
  <Wrapper>
    <header>
      <Navbar />
    </header>
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/product/:slug" component={ProductPage} />
        <GuestRoute exact path="/login" component={LoginPage} />
        <AuthRoute exact path="/checkout" component={CheckoutPageContainer} />
        <AuthRoute exact path="/address/new" component={CreateAddressPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  </Wrapper>
);

const AuthRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EnsureAuth {...matchProps}>
          {Component ? <Component {...matchProps} /> : null}
        </EnsureAuth>
      )}
    />
  );
};

const GuestRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EnsureGuest {...matchProps}>
          {Component ? <Component {...matchProps} /> : null}
        </EnsureGuest>
      )}
    />
  );
};

export default App;
