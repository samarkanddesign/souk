import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as qs from 'qs';
import { Option } from 'catling';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { DataProps, graphql, Query } from 'react-apollo';

import { ProductGrid } from '../components/ProductGrid';

const allProducts = gql`
  query allProducts($page: Int) {
    products(page: $page) {
      items {
        id
        name
        price
        slug
      }
      pagination {
        totalPages
      }
    }
  }
`;

interface ProductsQuery {
  products: any;
}

type Props = RouteComponentProps<{}> & DataProps<ProductsQuery, {}>;

const Shop = (props: Props) => {
  const location = props.location;
  const page = Option(qs.parse(location.search, { ignoreQueryPrefix: true }))
    .flatMap(query => Option<string>(query.page))
    .map(p => parseInt(p, 10))
    .filter(p => !isNaN(p) && Number.isFinite(p))
    .getOrElse(1);

  return (
    <div>
      <h1>Shop</h1>
      <p>Page {page}</p>
      <Query query={allProducts} variables={{ page }}>
        {({ data }) => (
          <>
            {page > 1 && (
              <Link to={{ pathname: '/shop', search: `?page=${page - 1}` }}>
                Previous
              </Link>
            )}
            {data.products &&
              data.products.pagination.totalPages > page && (
                <Link to={{ pathname: '/shop', search: `?page=${page + 1}` }}>
                  Next
                </Link>
              )}

            {data.products &&
              data.products.items && (
                <ProductGrid products={data.products.items} />
              )}
          </>
        )}
      </Query>
    </div>
  );
};

export default Shop;
