import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import { Mutation } from 'react-apollo';
import { RemoveProductFromBasketRootMutationTypeArgs } from '../../types/gql';

export const RemoveProduct = gql`
  mutation RemoveProduct($basketId: String!, $itemId: Int!) {
    removeProductFromBasket(basketId: $basketId, itemId: $itemId) {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class RemoveItemMutation extends Mutation<
  {},
  RemoveProductFromBasketRootMutationTypeArgs
> {}

export const AddProductToBasket = gql`
  mutation AddProductTobasket($basketId: String!, $productId: Int!) {
    addProductToBasket(
      basketId: $basketId
      productId: $productId
      quantity: 1
    ) {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class AddToBasketMutation extends Mutation<
  {},
  { basketId: string; productId: number }
> {}
