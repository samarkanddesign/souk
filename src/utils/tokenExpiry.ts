import { Option, None } from 'catling';
import { tryCatch } from 'ramda';
import jwtDecode from 'jwt-decode';

export const getTokenExpiry = (token: string | undefined) => {
  return Option(token)
    .flatMap(t => tryCatch(() => Option(jwtDecode<{ exp: number }>(t)), None)())
    .map(({ exp }) => new Date(exp * 1000));
};
