import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import { BasketRootQueryTypeArgs, Basket, Product } from '../../types/gql';
import { Query } from 'react-apollo';

export const GetBasket = gql`
  query GetBasket($basketId: String!) {
    basket(basketId: $basketId) {
      ...BasketFragment
    }
  }
  ${BasketFragment}
`;

export class BasketQuery extends Query<
  { basket?: Basket },
  BasketRootQueryTypeArgs
> {}

export const SingleProduct = gql`
  query SingleProduct($slug: String) {
    product(slug: $slug) {
      id
      name
      slug
      description
      price
      salePrice
      stockQty
      images {
        id
        url
      }
    }
  }
`;

export class SingleProductQuery extends Query<
  { product?: Product },
  { slug: string }
> {}
