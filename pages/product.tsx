import * as React from 'react';
import Layout from 'components/layout';
import { withRouter, SingletonRouter } from 'next/router';
import gql from 'graphql-tag';

interface Props {
  router: SingletonRouter;
}

const productBySlug = gql`
  query SingleProduct($slug: String) {
    product(slug: $slug) {
      name
      slug
      description
      price
      salePrice
    }
  }
`;

function Product(props: Props) {
  return (
    <Layout>
      <div>Product {props.router.query.slug}</div>
    </Layout>
  );
}

export default withRouter(Product);
