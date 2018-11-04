import { Validation } from '../../types/gql';

export const translateValidation = (
  errors: Validation[],
): Record<string, string> =>
  errors.reduce((acc, e) => {
    return { ...acc, [e.key]: e.reason };
  }, {});
