import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { State, Action } from '../store/reducers';
import { TextButton } from './Button';
import { UnsetToken } from '../store/reducers/auth';

interface StateMappedToProps {
  isLoggedIn: boolean;
}

interface DispatchMappedToProps {
  logout: () => void;
}

type Props = StateMappedToProps & DispatchMappedToProps;

export const LoginButton = ({ isLoggedIn, logout }: Props) => {
  if (isLoggedIn) {
    return <TextButton onClick={logout}>Logout 👋</TextButton>;
  }

  return <Link to="/login">Login</Link>;
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  isLoggedIn: !!state.auth.token,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  logout: () => dispatch(UnsetToken()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton);
