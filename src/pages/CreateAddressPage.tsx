import * as React from 'react';
import { Formik } from 'formik';
import { Option } from 'catling';
import { makeValidator } from 'mandle';

import { CreateAddressMutation, CREATE_ADDRESS } from '../graphql/mutations';
import { Button } from '../components/Button';
import Input from '../components/Input';
import { Vspace } from '../components/Vspace';
import { Validation, Address } from '../../types/gql';
import { RouteComponentProps } from 'react-router';
import { required } from '../utils/validation';
import { USER_ADDRESSES } from '../graphql/queries';

type Props = RouteComponentProps<{}>;

interface Fields {
  name: string;
  line1: string;
  line2: string;
  line3: string;
  city: string;
  country: string;
  postcode: string;
  phone: string;
}

const initialAddress = (): Fields => ({
  name: '',
  phone: '',
  line1: '',
  line2: '',
  line3: '',
  postcode: '',
  city: '',
  country: '',
});

const translateErrors = (errors: Validation[]) =>
  errors.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.key]: `${curr.key} ${curr.reason}`,
    }),
    {},
  );

const validate = makeValidator<Fields>({
  name: [required],
  line1: [required],
  line2: [],
  line3: [],
  city: [required],
  country: [required],
  postcode: [required],
  phone: [],
});

export const CreateAddressPage = ({ history }: Props) => {
  return (
    <div>
      <h2>Add an address</h2>
      <CreateAddressMutation
        mutation={CREATE_ADDRESS}
        update={(cache, res) => {
          Option.all([
            Option(res.data).flatMap(d => Option(d.createAddress.entity)),
            Option(
              cache.readQuery<{ userAddresses: Address[] }>({
                query: USER_ADDRESSES,
              }),
            ).map(({ userAddresses }) => userAddresses),
          ]).map(([newAddress, userAddresses]) => {
            cache.writeQuery({
              query: USER_ADDRESSES,
              data: { userAddresses: userAddresses.concat(newAddress) },
            });
          });
        }}
      >
        {(createAddress, { loading }) => {
          return (
            <Formik
              initialValues={initialAddress()}
              onSubmit={(values, bag) => {
                createAddress({ variables: values })
                  .then(data =>
                    Option(data || undefined)
                      .flatMap(d => Option(d.data))
                      .forEach(d => {
                        if (d.createAddress.validation) {
                          bag.setErrors(
                            translateErrors(d.createAddress.validation),
                          );
                          return;
                        }
                        history.push('/checkout');
                      }),
                  )
                  .catch(alert);
              }}
              validate={validate}
            >
              {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                errors,
                touched,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Vspace>
                      <Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                      />

                      <Input
                        label="Line 1"
                        name="line1"
                        value={values.line1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.line1 && errors.line1}
                      />
                      <Input
                        label="Line 2"
                        name="line2"
                        value={values.line2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.line2 && errors.line2}
                      />
                      <Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city && errors.city}
                      />
                      <Input
                        label="Postcode"
                        name="postcode"
                        value={values.postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.postcode && errors.postcode}
                      />
                      <Input
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.country && errors.country}
                      />

                      <Button type="submit">
                        {loading ? 'Loading...' : 'Save address'}
                      </Button>
                    </Vspace>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </CreateAddressMutation>
    </div>
  );
};
