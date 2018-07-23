import * as React from 'react';
import { TextButton } from './Button';
import styled from 'react-emotion';

interface Props {
  toggleBasket: () => void;
  itemCount: number;
}

const BasketButton = styled(TextButton)({ fontSize: '1rem' });

export const BasketToggle = ({ toggleBasket, itemCount }: Props) => {
  return <BasketButton onClick={toggleBasket}>🛒 {itemCount}</BasketButton>;
};
export default BasketToggle;
