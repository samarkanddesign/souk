import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import { Mutation } from 'react-apollo';
import {
  RemoveProductFromBasketRootMutationTypeArgs,
  Basket,
  Session,
  LoginRootMutationTypeArgs,
} from '../../types/gql';

export const CreateBasket = gql`
  mutation CreateBasket {
    createBasket {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class CreateBasketMutation extends Mutation<
  { createBasket: Basket },
  {}
> {}

export const RemoveProduct = gql`
  mutation RemoveProduct($basketId: UUID!, $itemId: Int!) {
    removeProductFromBasket(basketId: $basketId, itemId: $itemId) {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class RemoveItemMutation extends Mutation<
  Basket,
  RemoveProductFromBasketRootMutationTypeArgs
> {}

export const AddProductToBasket = gql`
  mutation AddProductTobasket($basketId: UUID!, $productId: Int!) {
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
  Basket,
  { basketId: string; productId: number }
> {}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      user {
        email
        name
      }
    }
  }
`;

export class LoginMutation extends Mutation<
  { login: Session },
  LoginRootMutationTypeArgs
> {}
