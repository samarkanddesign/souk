import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'catling';
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

export const EnsureGuest = ({
  isLoggedIn,
  children,
  redirect = '/shop',
  location,
}: Props) => {
  if (isLoggedIn) {
    const r = Option(
      qs.parse(location.search, { ignoreQueryPrefix: true }).intended,
    ).getOrElse(redirect);
    return <Redirect to={r} />;
  }

  return children;
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  isLoggedIn: !!state.auth.token,
});

export default connect(mapStateToProps)(EnsureGuest);
