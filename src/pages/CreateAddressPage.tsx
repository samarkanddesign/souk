import * as React from 'react';
import { Formik } from 'formik';
import { Option } from 'catling';

import { CreateAddressMutation, CREATE_ADDRESS } from '../graphql/mutations';
import { Button } from '../components/Button';
import Input from '../components/Input';
import { Vspace } from '../components/Vspace';
import { Validation } from '../../types/gql';

type Props = {};

const initialAddress = () => ({
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
      [curr.key]: curr.reason,
    }),
    {},
  );
export const CreateAddressPage = ({  }: Props) => {
  return (
    <div>
      <h2>Login</h2>
      <CreateAddressMutation mutation={CREATE_ADDRESS}>
        {createAddress => {
          return (
            <Formik
              initialValues={initialAddress()}
              onSubmit={values => {
                createAddress({ variables: values })
                  .then(data =>
                    Option(data ? data : undefined).flatMap(d =>
                      Option(d.data),
                    ),
                  )
                  .catch(alert);
              }}
            >
              {({ handleSubmit, handleBlur, handleChange, values }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Vspace>
                      <Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <Input
                        label="Line 1"
                        name="line1"
                        value={values.line1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Input
                        label="Line 2"
                        name="line2"
                        value={values.line2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Input
                        label="Postcode"
                        name="postcode"
                        value={values.postcode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Input
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <Button type="submit">Save address</Button>
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
