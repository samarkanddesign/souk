import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { State } from '../store/reducers';

interface StateMappedToProps {
  isLoggedIn: boolean;
}

interface OwnProps {
  children: React.ReactElement<any> | null;
  redirect?: string;
}

type Props = StateMappedToProps & OwnProps;

const EnsureAuth = ({ isLoggedIn, children, redirect = '/login' }: Props) => {
  if (!isLoggedIn) {
    return <Redirect to={redirect} />;
  }

  return children;
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  isLoggedIn: !!state.auth.token,
});

export default connect(mapStateToProps)(EnsureAuth);
