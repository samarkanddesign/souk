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
  LoadingSpinner,
} from '../components';
import {
  UserAddressesQuery,
  USER_ADDRESSES,
  CardsQuery,
  CARDS,
} from '../graphql/queries';
import CardForm from './checkout/CardForm';
import { Card } from '../../types/gql';

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
                            variables: values,
                          }).then(r => {
                            forgetBasket();
                          });
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          setFieldValue,
                        }) => {
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

                                <h3>Payment Method</h3>

                                <CardsQuery query={CARDS}>
                                  {({
                                    data,
                                    refetch,
                                    loading: cardsLoading,
                                  }) => {
                                    if (cardsLoading) {
                                      return 'Loading your cards...';
                                    }
                                    return (
                                      <>
                                        <div>
                                          {data && data.cards
                                            ? data.cards.map(c => (
                                                <Choice
                                                  key={c.id}
                                                  name="cardId"
                                                  id={`credit-card-${c.id}`}
                                                  onChange={handleChange}
                                                  value={c.id}
                                                >
                                                  <div style={{ flex: 1 }}>
                                                    {c.brand} ending in{' '}
                                                    {c.lastFour}
                                                  </div>
                                                  <div>
                                                    {c.expMonth}/{c.expYear}
                                                  </div>
                                                </Choice>
                                              ))
                                            : 'cards loading'}
                                        </div>

                                        <CardForm
                                          refetchCards={refetch}
                                          onSaveCard={cardId =>
                                            setFieldValue('cardId', cardId)
                                          }
                                        />
                                      </>
                                    );
                                  }}
                                </CardsQuery>
                                <div>
                                  <ButtonLink to="/address/new">
                                    Add new address
                                  </ButtonLink>

                                  <Button>Place order</Button>
                                </div>
                              </Vspace>
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
