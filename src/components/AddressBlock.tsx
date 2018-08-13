import * as React from 'react';
import { Address } from '../../types/gql';
import styled from 'react-emotion';
import { spacing } from './style';

interface Props {
  address: Address;
}

const AddressWrapper = styled('address')`
  font-style: normal;
  p:not(:last-child) {
    margin: 0 0 ${spacing.ant} 0;
  }
  p:last-child {
    margin: 0;
  }
`;

export const AddressBlock = ({ address }: Props) => {
  const parts: (keyof Address)[] = [
    'line1',
    'line2',
    'line3',
    'city',
    'country',
    'postcode',
  ];

  return (
    <AddressWrapper>
      {parts
        .map(part => ({ key: part, value: address[part] }))
        .filter(line => !!line.value)
        .map(line => (
          <p key={line.key}>{line.value}</p>
        ))}
    </AddressWrapper>
  );
};

export default AddressBlock;
