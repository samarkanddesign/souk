import { CheckoutPage } from './CheckoutPage';
import { connect } from 'react-redux';
import { ForgetBasket } from '../store/reducers/basket';
import { Dispatch } from 'redux';
import { Action, State } from '../store/reducers';

export interface StateMappedToProps {
  basketId?: string;
}

export interface DispatchMappedToProps {
  forgetBasket: () => void;
}

const mapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  forgetBasket: () => dispatch(ForgetBasket()),
});

export const CheckoutPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPage);
