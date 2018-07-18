import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Option } from 'catling';
import ProductDetail from '../components/ProductDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { basketId } from '../store/basketId';
import { AddToBasketMutation, AddProductToBasket } from '../graphql/mutations';
import { SingleProductQuery, SingleProduct } from '../graphql/queries';

type Props = RouteComponentProps<{ slug: string }>;

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
        return Option(data)
          .flatMap(d => Option(d.product))
          .map(product => (
            <AddToBasketMutation mutation={AddProductToBasket}>
              {addToBasket => {
                return (
                  <ProductDetail
                    product={product}
                    addToCart={() =>
                      addToBasket({
                        variables: {
                          productId: parseInt(product.id, 10),
                          basketId: basketId,
                        },
                      })
                    }
                  />
                );
              }}
            </AddToBasketMutation>
          ))
          .getOrElse(<NotFound />);
      }}
    </SingleProductQuery>
  );
};

export default ProductPage;
