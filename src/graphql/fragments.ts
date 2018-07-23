import gql from 'graphql-tag';

export const BasketFragment = gql`
  fragment BasketFragment on Basket {
    id
    items {
      id
      quantity
      product {
        name
        slug
        price
        salePrice
        thumbnail {
          url
        }
      }
    }
  }
`;
