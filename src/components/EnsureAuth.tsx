import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { State } from '../store/reducers';
import qs from 'qs';

interface StateMappedToProps {
  isLoggedIn: boolean;
}

interface OwnProps {
  children: React.ReactElement<any> | null;
  redirect?: string;
}

type Props = StateMappedToProps & OwnProps & RouteComponentProps<{}>;

const EnsureAuth = ({
  isLoggedIn,
  children,
  redirect = '/login',
  location,
}: Props) => {
  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: redirect,
          search: qs.stringify({ intended: location.pathname }),
        }}
      />
    );
  }

  return children;
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  isLoggedIn: !!state.auth.token,
});

export default connect(mapStateToProps)(EnsureAuth);
