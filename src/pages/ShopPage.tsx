import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as qs from 'qs';
import { Option } from 'catling';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { ProductGrid } from '../components/ProductGrid';
import { PagedProducts, ProductsRootQueryTypeArgs } from '../../types/gql';

class AllProductsQuery extends Query<
  { products?: PagedProducts },
  ProductsRootQueryTypeArgs
> {}

const allProducts = gql`
  query AllProducts($page: Int) {
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

type Props = RouteComponentProps<{}>;

const ShopPage = (props: Props) => {
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
      <AllProductsQuery query={allProducts} variables={{ page }}>
        {({ data }) => {
          const products = Option(data).flatMap(d => Option(d.products));

          return (
            <>
              {page > 1 && (
                <Link to={{ pathname: '/shop', search: `?page=${page - 1}` }}>
                  Previous
                </Link>
              )}

              {products
                .filter(p => p.pagination.totalPages > page)
                .map(() => (
                  <Link to={{ pathname: '/shop', search: `?page=${page + 1}` }}>
                    Next
                  </Link>
                ))
                .get()}

              {products.map(p => <ProductGrid products={p.items} />).get()}
            </>
          );
        }}
      </AllProductsQuery>
    </div>
  );
};

export default ShopPage;
