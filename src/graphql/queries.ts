import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import {
  BasketRootQueryTypeArgs,
  Basket,
  Product,
  ProductListRootQueryTypeArgs,
  PagedProducts,
  Address,
  Card,
} from '../../types/gql';
import { Query } from 'react-apollo';

export const GET_BASKET = gql`
  query GetBasket($basketId: UUID!) {
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

export const SINGLE_PRODUCT = gql`
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

export class AllProductsQuery extends Query<
  { productList?: PagedProducts },
  ProductListRootQueryTypeArgs
> {}

export const ALL_PRODUCTS = gql`
  query AllProducts($page: Int) {
    productList(page: $page) {
      products {
        id
        name
        price
        slug
        thumbnail {
          url
        }
      }
      pagination {
        totalPages
      }
    }
  }
`;

export class UserAddressesQuery extends Query<
  { userAddresses: Address[] },
  {}
> {}

export const USER_ADDRESSES = gql`
  {
    userAddresses {
      id
      line1
      line2
      postcode
      city
      country
    }
  }
`;

export class CardsQuery extends Query<{ cards: Card[] }, {}> {}

export const CARDS = gql`
  {
    cards {
      id
      expYear
      expMonth
      brand
      lastFour
    }
  }
`;
