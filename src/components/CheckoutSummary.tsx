import * as React from 'react';

import { Option } from 'catling';
import { BasketQuery, GET_BASKET } from '../graphql/queries';
import { basketTotal } from '../utils/basketTotal';

interface Props {
  basketId: string;
}

export const CheckoutSummary = ({ basketId }: Props) => {
  return (
    <BasketQuery query={GET_BASKET} variables={{ basketId }}>
      {({ data, loading }) => {
        if (loading) {
          return <span>loading...</span>;
        }

        return Option(data)
          .flatMap(d => Option(d.basket))
          .map(({ items }) => (
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>£{basketTotal(items)}</td>
                </tr>
              </tbody>
            </table>
          ))
          .getOrElse(null);
      }}
    </BasketQuery>
  );
};
