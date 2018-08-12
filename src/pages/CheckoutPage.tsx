import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Option } from 'catling';

import { PlaceOrderMutation, PLACE_ORDER } from '../graphql/mutations';
import { State } from '../store/reducers';
import { Formik } from 'formik';
import { Button } from '../components/Button';
import { UserAddressesQuery, USER_ADDRESSES } from '../graphql/queries';

interface StateMappedToProps {
  basketId?: string;
}
type Props = StateMappedToProps;

export const CheckoutPage = ({ basketId }: Props) => {
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
                        placeOrder({ variables: values }).then(console.log);
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

export default connect(mapStateToProps)(CheckoutPage);
