import * as React from 'react';

import { GetBasket, BasketQuery } from '../graphql/queries';
import { connect } from 'react-redux';
import { State, Action } from '../store/reducers';
import BasketInitializer from './BasketInitializer';
import { TextButton, ButtonLink } from './Button';
import styled from 'react-emotion';
import { Dispatch } from 'redux';
import { SetBasketVisibility } from '../store/reducers/basket';
import { BasketToggle } from './BasketToggle';
import { BasketContent } from './BasketContent';

const basketWidth = '30rem';
const BasketContainer = styled('div')<{ visible: boolean }>(
  {
    background: '#fff',
    height: '100vh',
    position: 'fixed',
    width: basketWidth,
    maxWidth: '100%',
    top: 0,
    padding: '2rem',
    transition: 'right .4s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  props => ({
    right: props.visible ? 0 : `-${basketWidth}`,
  }),
);

const BasketUnderlay = styled('div')<{ visible: boolean }>(
  {
    background: '#333',
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    // transition: 'opacity: .4s ease',
  },
  props => ({
    display: props.visible ? 'normal' : 'none',
    opacity: props.visible ? 0.5 : 0,
  }),
);

const BasketCtaContainer = styled('aside')({
  alignSelf: 'flex-end',
  display: 'block',
  width: '100%',
});

interface StateMappedToProps {
  basketId?: string;
  basketVisible: boolean;
}
interface DispatchMappedToProps {
  closeBasket: () => void;
  openBasket: () => void;
}

type Props = StateMappedToProps & DispatchMappedToProps;

const BasketHeader = styled('header')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Basket = ({
  basketId,
  basketVisible,
  closeBasket,
  openBasket,
}: Props) => {
  if (!basketId) {
    return <BasketInitializer />;
  }
  return (
    <BasketQuery query={GetBasket} variables={{ basketId }}>
      {({ data, loading }) => {
        const items = (data && data.basket && data.basket.items) || [];
        return (
          <>
            <BasketToggle toggleBasket={openBasket} itemCount={items.length} />
            <BasketUnderlay onClick={closeBasket} visible={basketVisible} />
            <BasketContainer visible={basketVisible}>
              <BasketHeader>
                <h2>Basket</h2>
                <TextButton onClick={closeBasket}>✖️</TextButton>
              </BasketHeader>
              <BasketContent
                loading={loading}
                basketId={basketId}
                items={items}
              />
              <BasketCtaContainer>
                <ButtonLink to="/basket" isFullWidth={true}>
                  Go to basket
                </ButtonLink>
              </BasketCtaContainer>
            </BasketContainer>
          </>
        );
      }}
    </BasketQuery>
  );
};

const MapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
  basketVisible: state.basket.showing,
});
const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  closeBasket: () => dispatch(SetBasketVisibility(false)),
  openBasket: () => dispatch(SetBasketVisibility(true)),
});

export default connect(
  MapStateToProps,
  mapDispatchToProps,
)(Basket);
