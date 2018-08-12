import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Option } from 'catling';
import { Dispatch } from 'redux';

import { PlaceOrderMutation, PLACE_ORDER } from '../graphql/mutations';
import { State, Action } from '../store/reducers';
import { Formik } from 'formik';
import { Button, ButtonLink } from '../components/Button';
import { UserAddressesQuery, USER_ADDRESSES } from '../graphql/queries';
import { ForgetBasket } from '../store/reducers/basket';

interface StateMappedToProps {
  basketId?: string;
}

interface DispatchMappedToProps {
  forgetBasket: () => void;
}
type Props = StateMappedToProps & DispatchMappedToProps;

export const CheckoutPage = ({ basketId, forgetBasket }: Props) => {
  if (!basketId) {
    return <Redirect to="/shop" />;
  }
  return (
    <div>
      <h1>Checkout</h1>
      <UserAddressesQuery query={USER_ADDRESSES}>
        {({ data }) => {
          return Option(data)
            .flatMap(d => Option(d.userAddresses))
            .map(addresses => {
              return (
                <PlaceOrderMutation mutation={PLACE_ORDER}>
                  {placeOrder => (
                    <Formik
                      initialValues={{
                        basketId,
                        billingAddressId: '',
                        shippingAddressId: '',
                      }}
                      onSubmit={values => {
                        placeOrder({ variables: values }).then(r => {
                          forgetBasket();
                        });
                      }}
                    >
                      {({ handleSubmit, handleChange }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            <h3>Shipping Address</h3>
                            {addresses.map(address => {
                              return (
                                <label key={address.id}>
                                  <input
                                    type="radio"
                                    name="shippingAddressId"
                                    value={address.id}
                                    onChange={handleChange}
                                  />
                                  <pre>{JSON.stringify(address, null, 2)}</pre>
                                </label>
                              );
                            })}

                            <h3>Billing Address</h3>
                            {addresses.map(address => {
                              return (
                                <label key={address.id}>
                                  <input
                                    type="radio"
                                    name="billingAddressId"
                                    value={address.id}
                                    onChange={handleChange}
                                  />
                                  <pre>{JSON.stringify(address, null, 2)}</pre>
                                </label>
                              );
                            })}
                            <ButtonLink to="/address/new">
                              Add new address
                            </ButtonLink>
                            <Button>Place order</Button>
                          </form>
                        );
                      }}
                    </Formik>
                  )}
                </PlaceOrderMutation>
              );
            })
            .getOrElse(null);
        }}
      </UserAddressesQuery>
    </div>
  );
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  forgetBasket: () => dispatch(ForgetBasket()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPage);
