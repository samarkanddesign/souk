import gql from 'graphql-tag';
import { BasketFragment } from './fragments';
import {
  BasketRootQueryTypeArgs,
  Basket,
  Product,
  ProductListRootQueryTypeArgs,
  PagedProducts,
} from '../../types/gql';
import { Query } from 'react-apollo';

export const GetBasket = gql`
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

export class AllProductsQuery extends Query<
  { productList?: PagedProducts },
  ProductListRootQueryTypeArgs
> {}

export const allProducts = gql`
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
