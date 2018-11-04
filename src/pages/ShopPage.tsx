import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as qs from 'qs';
import { Option } from 'catling';
import { Link } from 'react-router-dom';

import { ProductGrid } from '../components/ProductGrid';
import { AllProductsQuery, ALL_PRODUCTS } from '../graphql/queries';
import styled from 'react-emotion';
import { spacing, media } from '../components/style';

const CatalogueContainer = styled('div')`
  display: grid;
  grid-column-gap: ${spacing.goat};
  grid-template-columns: 12rem 1fr;
  ${media.sm`
  grid-template-columns: 1fr;
  `};
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
    <CatalogueContainer>
      <aside>
        <h3>Categories</h3>
      </aside>
      <div>
        <h1>Shop</h1>
        <p>Page {page}</p>
        <AllProductsQuery
          query={ALL_PRODUCTS}
          variables={{ page, pageSize: 12 }}
        >
          {({ data }) => {
            const products = Option(data).flatMap(d => Option(d.productList));

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
                    <Link
                      to={{ pathname: '/shop', search: `?page=${page + 1}` }}
                    >
                      Next
                    </Link>
                  ))
                  .get()}

                {products.map(p => <ProductGrid products={p.products} />).get()}
              </>
            );
          }}
        </AllProductsQuery>
      </div>
    </CatalogueContainer>
  );
};

export default ShopPage;
