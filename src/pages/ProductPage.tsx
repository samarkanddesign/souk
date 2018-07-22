import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Option } from 'catling';
import ProductDetail from '../components/ProductDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import {
  AddToBasketMutation,
  AddProductToBasket,
  CreateBasketMutation,
  CreateBasket,
} from '../graphql/mutations';
import { SingleProductQuery, SingleProduct } from '../graphql/queries';
import { State } from '../store/reducers';
import { connect } from 'react-redux';

interface StateMappedToProps {
  basketId?: string;
}

type Props = RouteComponentProps<{ slug: string }> & StateMappedToProps;

const ProductPage = ({ match, basketId }: Props) => {
  return (
    <SingleProductQuery
      query={SingleProduct}
      variables={{ slug: match.params.slug }}
    >
      {({ data, loading }) => {
        if (loading) {
          return <LoadingSpinner />;
        }
        return Option(data)
          .flatMap(d => Option(d.product))
          .map(product => (
            <AddToBasketMutation
              mutation={AddProductToBasket}
              onError={e => alert(e.message)}
            >
              {addToBasket => {
                const addToCart = basketId
                  ? () =>
                      addToBasket({
                        variables: {
                          productId: parseInt(product.id, 10),
                          basketId,
                        },
                      })
                  : () => {};

                return (
                  <ProductDetail product={product} addToCart={addToCart} />
                );
              }}
            </AddToBasketMutation>
          ))
          .getOrElse(<NotFound />);
      }}
    </SingleProductQuery>
  );
};

const MapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

export default connect(MapStateToProps)(ProductPage);
