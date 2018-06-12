import withData from '../lib/apollo';
import gql from 'graphql-tag';
import { graphql, DataProps } from 'react-apollo';
import { prop } from 'ramda';
import { Option } from 'catling';

import { PagedProducts } from 'types/gql';
import { ProductTile } from 'components/product-tile';
import Layout from 'components/layout';
import styled from 'react-emotion';

const ProductGrid = styled('ul')`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-auto-rows: 1fr;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const allProducts = gql`
  query {
    products {
      items {
        id
        name
        price
      }
    }
  }
`;

interface ProductsQuery {
  products: PagedProducts;
}

type Props = DataProps<ProductsQuery, {}>;

function Shop({ data }: Props) {
  return (
    <div>
      <Layout>
        <>
          {Option(data.products)
            .map(prop('items'))
            .map(items => (
              <ProductGrid>
                {items.map(product => (
                  <ProductTile product={product} key={product.id} />
                ))}
              </ProductGrid>
            ))
            .get()}
        </>
      </Layout>
    </div>
  );
}

export default withData(graphql(allProducts)(Shop));
