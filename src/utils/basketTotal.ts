import round from 'lodash/round';
import { BasketItem } from '../../types/gql';

export const basketTotal = (items: BasketItem[]) =>
  round(
    items.reduce(
      (total, { product, quantity }) =>
        total + (product.salePrice || product.price) * quantity,
      0,
    ) / 100,
    2,
  ).toFixed(2);
