import withData from '../lib/apollo';
import gql from 'graphql-tag';
import { graphql, DataProps } from 'react-apollo';
import { prop } from 'ramda';
import { Option } from 'catling';

import Navbar from 'components/navbar';
import { PagedProducts } from 'types/gql';
import { ProductTile } from 'components/product-tile';

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
      <Navbar />
      {Option(data.products)
        .map(prop('items'))
        .map(items => (
          <ul>
            {items.map(product => (
              <ProductTile product={product} key={product.id} />
            ))}
          </ul>
        ))
        .get()}
    </div>
  );
}

export default withData(graphql(allProducts)(Shop));
