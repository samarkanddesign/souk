import * as React from 'react';
import { Redirect } from 'react-router';
import { Formik } from 'formik';
import { Option } from 'catling';
import { PlaceOrderMutation, PLACE_ORDER } from '../graphql/mutations';
import {
  StateMappedToProps,
  DispatchMappedToProps,
} from './CheckoutPageContainer';

import {
  CheckoutSummary,
  Vspace,
  Choice,
  AddressBlock,
  ButtonLink,
  Button,
} from '../components';
import { UserAddressesQuery, USER_ADDRESSES } from '../graphql/queries';

type Props = StateMappedToProps & DispatchMappedToProps;

export const CheckoutPage = ({ basketId, forgetBasket }: Props) => {
  if (!basketId) {
    return <Redirect to="/shop" />;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <UserAddressesQuery query={USER_ADDRESSES}>
        {({ data }) =>
          Option(data)
            .flatMap(d => Option(d.userAddresses))
            .map(addresses => (
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

                          <Vspace>
                            {addresses.map(address => {
                              return (
                                <Choice
                                  key={address.id}
                                  id={`shipping-address-${address.id}`}
                                  name="shippingAddressId"
                                  value={address.id}
                                  onChange={handleChange}
                                >
                                  <AddressBlock address={address} />
                                </Choice>
                              );
                            })}
                          </Vspace>

                          <h3>Billing Address</h3>
                          <Vspace>
                            {addresses.map(address => {
                              return (
                                <Choice
                                  key={address.id}
                                  id={`billing-address-${address.id}`}
                                  name="billingAddressId"
                                  value={address.id}
                                  onChange={handleChange}
                                >
                                  <AddressBlock address={address} />
                                </Choice>
                              );
                            })}
                          </Vspace>

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
            ))
            .getOrElse('Something went wrong')
        }
      </UserAddressesQuery>

      <CheckoutSummary basketId={basketId} />
    </div>
  );
};
