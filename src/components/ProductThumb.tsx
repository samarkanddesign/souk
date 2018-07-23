import * as React from 'react';
import styled from 'react-emotion';
import { Option } from 'catling';

import { ProductImage } from '../../types/gql';

const ProductImage = styled('img')`
  width: 100%;
  height: auto;
`;

interface Props {
  thumbnail: ProductImage | null;
}

export const ProductThumb = ({ thumbnail }: Props) => {
  return (
    <ProductImage
      src={Option(thumbnail)
        .map(t => t.url)
        .getOrElse('https://via.placeholder.com/150x150')}
      alt=""
    />
  );
};

export default ProductThumb;
