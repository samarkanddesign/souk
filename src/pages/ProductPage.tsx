import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Product } from '../../types/gql';
import { Option } from 'catling';
import ProductDetail from '../components/ProductDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { connect } from 'react-redux';

import { StoreAction } from '../store/reducers';
import { Dispatch } from 'redux';
import { AddProductToCart } from '../store/reducers/cartReducer';

interface StateMappedToProps {}

interface DispatchMappedToProps {
  addToCart: (id: string) => void;
}
type Props = RouteComponentProps<{ slug: string }> &
  StateMappedToProps &
  DispatchMappedToProps;

const SingleProduct = gql`
  query SingleProduct($slug: String) {
    product(slug: $slug) {
      id
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

const ProductPage = ({ match, addToCart }: Props) => {
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
              .map(product => (
                <ProductDetail product={product} addToCart={addToCart} />
              ))
              .getOrElse(<NotFound />)}
          </>
        );
      }}
    </SingleProductQuery>
  );
};

export default connect<StateMappedToProps, DispatchMappedToProps>(
  () => ({}),
  (dispatch: Dispatch<StoreAction>) => {
    return {
      addToCart: (id: string) => dispatch(AddProductToCart(id)),
    };
  },
)(ProductPage);
