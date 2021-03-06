import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import { Mutation } from 'react-apollo';
import {
  RemoveProductFromBasketRootMutationTypeArgs,
  Basket,
  Session,
  LoginRootMutationTypeArgs,
  PlaceOrderRootMutationTypeArgs,
  PlaceOrderResponse,
  CreateAddressResponse,
  CreateAddressRootMutationTypeArgs,
  RegisterResponse,
  RegisterRootMutationTypeArgs,
  SaveCardRootMutationTypeArgs,
  SaveCardResponse,
} from '../../types/gql';

export const CREATE_BASKET = gql`
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

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($basketId: UUID!, $itemId: Int!) {
    removeProductFromBasket(basketId: $basketId, itemId: $itemId) {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class RemoveItemMutation extends Mutation<
  { removeProductFromBasket: Basket },
  RemoveProductFromBasketRootMutationTypeArgs
> {}

export const ADD_PRODUCT_TO_BASKET = gql`
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

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      entity {
        jwt
        user {
          name
          id
        }
      }
      validation {
        reason
        key
      }
    }
  }
`;

export class RegisterMutation extends Mutation<
  { register: RegisterResponse },
  RegisterRootMutationTypeArgs
> {}

export const PLACE_ORDER = gql`
  mutation PlaceOrder(
    $basketId: UUID!
    $shippingAddressId: UUID!
    $cardId: String!
  ) {
    placeOrder(
      basketId: $basketId
      shippingAddressId: $shippingAddressId
      cardId: $cardId
    ) {
      status
      order {
        id
      }
    }
  }
`;
export class PlaceOrderMutation extends Mutation<
  { placeOrder: PlaceOrderResponse },
  PlaceOrderRootMutationTypeArgs
> {}

export const CREATE_ADDRESS = gql`
  mutation CreateAddress(
    $name: String
    $phone: String
    $line1: String
    $line2: String
    $line3: String
    $postcode: String!
    $city: String!
    $country: String!
  ) {
    createAddress(
      name: $name
      phone: $phone
      line1: $line1
      line2: $line2
      line3: $line3
      postcode: $postcode
      city: $city
      country: $country
    ) {
      entity {
        id
        name
        phone
        line1
        line2
        line3
        postcode
        city
        country
      }
      validation {
        key
        reason
      }
    }
  }
`;

export class CreateAddressMutation extends Mutation<
  { createAddress: CreateAddressResponse },
  CreateAddressRootMutationTypeArgs
> {}

export const SAVE_CARD = gql`
  mutation SaveCard($token: String!) {
    saveCard(token: $token) {
      cards {
        id
        expYear
        expMonth
        brand
        lastFour
      }
      error
    }
  }
`;

export class SaveCardMutation extends Mutation<
  { saveCard: SaveCardResponse },
  SaveCardRootMutationTypeArgs
> {}
