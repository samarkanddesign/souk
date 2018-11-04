import * as React from 'react';
import { CreateBasketMutation, CREATE_BASKET } from '../graphql/mutations';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action, State } from '../store/reducers';
import { SetBasketId } from '../store/reducers/basket';

interface DispatchMappedToProps {
  setBasketId: (basketId: string) => void;
}

interface StateMappedToProps {
  basketId: string | undefined;
}

type Props = DispatchMappedToProps & StateMappedToProps;

export const BasketInitializer = ({ basketId, setBasketId }: Props) => {
  if (basketId) {
    return null;
  }
  return (
    <CreateBasketMutation
      mutation={CREATE_BASKET}
      onCompleted={r => setBasketId(r.createBasket.id)}
    >
      {f => <CallCreateBasket createBasket={f} />}
    </CreateBasketMutation>
  );
};

class CallCreateBasket extends React.Component<
  { createBasket: () => void; children?: React.ReactNode },
  {}
> {
  componentDidMount() {
    this.props.createBasket();
  }
  render() {
    return this.props.children || null;
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => {
  return {
    setBasketId: basketId => dispatch(SetBasketId(basketId)),
  };
};

export default connect(
  (state: State): StateMappedToProps => ({ basketId: state.basket.basketId }),
  mapDispatchToProps,
)(BasketInitializer);
