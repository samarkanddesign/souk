import * as React from 'react';
import { CreateBasketMutation, CreateBasket } from '../graphql/mutations';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from '../store/reducers';
import { SetBasketId } from '../store/reducers/basket';

interface DispatchMappedToProps {
  setBasketId: (basketId: string) => void;
}

interface Props extends DispatchMappedToProps {}

export const BasketInitializer = ({ setBasketId }: Props) => {
  return (
    <CreateBasketMutation
      mutation={CreateBasket}
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
  () => ({}),
  mapDispatchToProps,
)(BasketInitializer);
