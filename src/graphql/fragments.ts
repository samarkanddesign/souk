import gql from 'graphql-tag';

export const BasketFragment = gql`
  fragment BasketFragment on Basket {
    id
    basketId
    items {
      id
      quantity
      product {
        name
      }
    }
  }
`;
