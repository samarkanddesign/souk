import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Product } from '../../types/gql';
import { Option } from 'catling';
import ProductDetail from '../components/ProductDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import styled from 'react-emotion';
import { animation } from '../components/style';
import NotFound from '../components/NotFound';

type Props = RouteComponentProps<{ slug: string }>;

const SingleProduct = gql`
  query SingleProduct($slug: String) {
    product(slug: $slug) {
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

class SingleProductQuery extends Query<
  { product?: Product },
  { slug: string }
> {}

const ProductPage = ({ match }: Props) => {
  return (
    <SingleProductQuery
      query={SingleProduct}
      variables={{ slug: match.params.slug }}
    >
      {({ data, loading }) => {
        if (loading) {
          return <LoadingSpinner />;
        }
        return (
          <>
            {Option(data)
              .flatMap(d => Option(d.product))
              .map(product => <ProductDetail product={product} />)
              .getOrElse(<NotFound />)}
          </>
        );
      }}
    </SingleProductQuery>
  );
};

export default ProductPage;
