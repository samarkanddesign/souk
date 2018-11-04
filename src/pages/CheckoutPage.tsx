import * as React from 'react';
import { Redirect } from 'react-router';
import { Formik } from 'formik';
import { Option } from 'catling';
import {
  PlaceOrderMutation,
  PLACE_ORDER,
  SaveCardMutation,
  SAVE_CARD,
} from '../graphql/mutations';
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
  LoadingSpinner,
} from '../components';
import {
  UserAddressesQuery,
  USER_ADDRESSES,
  CardsQuery,
  CARDS,
} from '../graphql/queries';
import CardForm from './checkout/CardForm';

type Props = StateMappedToProps & DispatchMappedToProps;

export const CheckoutPage = ({ basketId, forgetBasket }: Props) => {
  if (!basketId) {
    return <Redirect to="/shop" />;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <UserAddressesQuery query={USER_ADDRESSES}>
        {({ data, loading }) =>
          loading ? (
            <LoadingSpinner />
          ) : (
            Option(data)
              .flatMap(d => Option(d.userAddresses))
              .map(addresses => {
                if (addresses.length === 0) {
                  return <Redirect to="/address/new" />;
                }
                return (
                  <PlaceOrderMutation mutation={PLACE_ORDER}>
                    {(placeOrder, { loading: orderLoading }) => (
                      <Formik
                        initialValues={{
                          basketId,
                          shippingAddressId: '',
                          cardId: '',
                        }}
                        onSubmit={values => {
                          placeOrder({
                            variables: {
                              ...values,
                              billingAddressId: values.shippingAddressId,
                            },
                          }).then(r => {
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

                              <CardsQuery query={CARDS}>
                                {({ data, refetch, loading: cardsLoading }) => {
                                  if (cardsLoading) {
                                    return 'Loading your cards...';
                                  }
                                  return (
                                    <>
                                      {data && data.cards ? (
                                        <Vspace>
                                          {data.cards.map(c => (
                                            <label
                                              key={c.id}
                                              style={{ display: 'block' }}
                                            >
                                              <input
                                                type="radio"
                                                value={c.id}
                                                name="cardId"
                                                onChange={handleChange}
                                              />
                                              {c.brand} - {c.lastFour} -{' '}
                                              {c.expMonth} / {c.expYear}
                                            </label>
                                          ))}
                                        </Vspace>
                                      ) : (
                                        'cards loading'
                                      )}

                                      <CardForm refetchCards={refetch} />
                                    </>
                                  );
                                }}
                              </CardsQuery>

                              <ButtonLink to="/address/new">
                                Add new address
                              </ButtonLink>
                              <br />
                              <Button>Place order</Button>
                            </form>
                          );
                        }}
                      </Formik>
                    )}
                  </PlaceOrderMutation>
                );
              })
              .getOrElse('Something went wrong 😟')
          )
        }
      </UserAddressesQuery>

      <CheckoutSummary basketId={basketId} />
    </div>
  );
};
