import { keyframes } from 'react-emotion';

export const spacing = {
  ant: '0.444rem',
  cat: '0.667rem',
  goat: '1rem',
  lion: '1.5rem',
  whale: '2.25rem',
};

export const typeSize = {
  bee: '0.5rem',
  crab: '0.707rem',
  fox: '1rem',
  llama: '1.414rem',
  rhino: '1.999rem',
};

export const greys = {
  black: '#000',
  midGrey: '#555555',
  gray: '#777777',
  silver: '#999999',
  lightSilver: '#AAAAAA',
  moonGrey: '#CCCCCC',
  lightGrey: '#EEEEEE',
  nearWhite: '#F4F4F4',
  white: '#FFFFFF',
};

export const animation = {
  spin: keyframes`
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
`,
  fadeIn: keyframes`
  from: {opacity: 0;}
  to: {opacity: 1;}
`,
};
