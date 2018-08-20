import * as React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  LoginMutation,
  LOGIN,
  REGISTER,
  RegisterMutation,
} from '../graphql/mutations';
import { Button } from '../components/Button';
import Input from '../components/Input';
import { SetToken } from '../store/reducers/auth';
import { Action } from '../store/reducers';
import { Vspace } from '../components/Vspace';
import { List } from 'catling';

interface DispatchMappedToProps {
  setToken: (token: string) => void;
}

type Props = DispatchMappedToProps;

export const LoginPage = ({ setToken }: Props) => {
  return (
    <div>
      <div>
        <h2>Login</h2>
        <LoginMutation mutation={LOGIN}>
          {getSession => {
            return (
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                  getSession({ variables: values })
                    .then(data => {
                      if (data && data.data && data.data.login) {
                        setToken(data.data.login.jwt);
                      }
                    })
                    .catch(alert);
                }}
              >
                {({ handleSubmit, handleBlur, handleChange, values }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Vspace>
                        <Input
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Input
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="password"
                        />

                        <Button type="submit">Login</Button>
                      </Vspace>
                    </form>
                  );
                }}
              </Formik>
            );
          }}
        </LoginMutation>
      </div>
      <div>
        <h2>Register</h2>

        <RegisterMutation mutation={REGISTER}>
          {register => {
            return (
              <Formik
                initialValues={{ email: '', password: '', name: '' }}
                onSubmit={values => {
                  register({ variables: values })
                    .then(data => {
                      if (data && data.data) {
                        if (
                          data.data.register.validation &&
                          data.data.register.validation.length
                        ) {
                          console.log(data.data.register.validation);

                          return List(...data.data.register.validation)
                            .headOption()
                            .map(
                              validation =>
                                `${validation.key} ${validation.reason}`,
                            )
                            .forEach(alert);
                        }

                        if (data.data.register.entity) {
                          setToken(data.data.register.entity.jwt);
                        }
                      }
                    })
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
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Input
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="password"
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
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  setToken: token => dispatch(SetToken(token)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(LoginPage);
