import withData from '../lib/apollo';
import gql from 'graphql-tag';
import { graphql, DataProps } from 'react-apollo';
import { prop } from 'ramda';
import { Option } from 'catling';

import { PagedProducts } from 'types/gql';
import Layout from 'components/layout';
import ProductGrid from 'components/product-grid';

const allProducts = gql`
  query {
    products {
      items {
        id
        name
        price
        slug
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
            .map(items => <ProductGrid>{items}</ProductGrid>)
            .get()}
        </>
      </Layout>
    </div>
  );
}

export default withData(graphql(allProducts)(Shop));
