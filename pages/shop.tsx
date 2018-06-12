import withData from '../lib/apollo';
import gql from 'graphql-tag';
import { graphql, DataProps } from 'react-apollo';
import Navbar from 'components/navbar';

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

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductsQuery {
  products: {
    items: Product[];
  };
}

interface Props extends DataProps<ProductsQuery, {}> {}

function Shop({ data }: Props) {
  return (
    <div>
      <Navbar />
      {data.products &&
        data.products.items && (
          <ul>
            {data.products.items.map(product => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                £{(product.price / 100).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default withData(graphql(allProducts)(Shop));
