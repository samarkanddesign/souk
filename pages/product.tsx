import * as React from 'react';
import Layout from 'components/layout';
import { withRouter, SingletonRouter } from 'next/router';

interface Props {
  router: SingletonRouter;
}

function Product(props: Props) {
  return (
    <Layout>
      <div>Product {props.router.query.slug}</div>
    </Layout>
  );
}

export default withRouter(Product);
