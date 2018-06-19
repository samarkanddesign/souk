import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import styled from 'react-emotion';
import { spacing } from './components/style';

const Wrapper = styled('div')`
  max-width: 64rem;
  margin: 0 auto;
  padding: ${spacing.lion};
`;

const App = () => (
  <Wrapper>
    <Navbar />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </Wrapper>
);

export default App;
