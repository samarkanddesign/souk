import * as React from 'react';
import { RegisterMutation, REGISTER } from '../../graphql/mutations';
import { Formik } from 'formik';
import { Vspace, Input, Button } from '../../components';
import { List } from 'catling';
import { translateValidation } from '../../graphql/utils';

interface Props {
  setToken: (token: string) => void;
}

export const RegisterForm = ({ setToken }: Props) => {
  return (
    <div>
      <h2>Register</h2>

      <RegisterMutation mutation={REGISTER}>
        {register => {
          return (
            <Formik
              initialValues={{ email: '', password: '', name: '' }}
              onSubmit={(values, { setErrors }) => {
                register({ variables: values })
                  .then(data => {
                    if (data && data.data) {
                      if (
                        data.data.register.validation &&
                        data.data.register.validation.length
                      ) {
                        return setErrors(
                          translateValidation(data.data.register.validation),
                        );
                      }

                      if (data.data.register.entity) {
                        setToken(data.data.register.entity.jwt);
                      }
                    }
                  })
                  .catch(alert);
              }}
            >
              {({ handleSubmit, handleBlur, handleChange, values, errors }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Vspace>
                      <Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                      />
                      <Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                      />

                      <Input
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        error={errors.password}
                      />

                      <Button type="submit">Register</Button>
                    </Vspace>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </RegisterMutation>
    </div>
  );
};

export default RegisterForm;
