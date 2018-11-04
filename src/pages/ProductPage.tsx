import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Option } from 'catling';
import ProductDetail from '../components/ProductDetail';
import NotFound from '../components/NotFound';
import {
  AddToBasketMutation,
  ADD_PRODUCT_TO_BASKET,
} from '../graphql/mutations';
import { SingleProductQuery, SINGLE_PRODUCT } from '../graphql/queries';
import { State, Action } from '../store/reducers';
import { connect } from 'react-redux';
import { SetBasketVisibility } from '../store/reducers/basket';
import { Dispatch } from 'redux';
import { LoadingSpinner } from '../components';

interface StateMappedToProps {
  basketId?: string;
}

interface DispatchMappedToProps {
  showBasket: () => void;
}

type Props = RouteComponentProps<{ slug: string }> &
  StateMappedToProps &
  DispatchMappedToProps;

const ProductPage = ({ match, basketId, showBasket }: Props) => {
  return (
    <SingleProductQuery
      query={SINGLE_PRODUCT}
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
              mutation={ADD_PRODUCT_TO_BASKET}
              onError={e => alert(e.message)}
              onCompleted={showBasket}
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
                  <ProductDetail product={product} addToBasket={addToCart} />
                );
              }}
            </AddToBasketMutation>
          ))
          .getOrElse(<NotFound />);
      }}
    </SingleProductQuery>
  );
};

const mapStateToProps = (state: State): StateMappedToProps => ({
  basketId: state.basket.basketId,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  showBasket: () => dispatch(SetBasketVisibility(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductPage);
