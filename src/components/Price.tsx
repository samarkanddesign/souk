import * as React from 'react';

import { Option } from 'catling';

interface Props {
  price: number;
  salePrice?: number | null;
}

export default function Price({ price, salePrice }: Props) {
  return (
    <span>
      {Option(salePrice)
        .map(formatPrice)
        .map(sp => (
          <>
            <del>{formatPrice(price)}</del> {sp}
          </>
        ))
        .getOrElse(formatPrice(price))}
    </span>
  );
}

function formatPrice(price: number) {
  return '£' + (price / 100).toFixed(2);
}
