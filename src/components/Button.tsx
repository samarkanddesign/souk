import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { greys } from './style';

export const Button = styled('button', {
  shouldForwardProp: prop => prop !== 'isFullWidth',
})<{ isFullWidth?: boolean }>(
  {
    padding: '1rem 2rem',
    backgroundColor: greys.b,
    border: `2px solid ${greys.b}`,
    '&:hover': {
      backgroundColor: greys.c,
      borderColor: greys.c,
    },

    cursor: 'pointer',
    color: '#fff',
    fontSize: '100%',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
  },
  props => ({
    width: props.isFullWidth ? '100%' : undefined,
    display: props.isFullWidth ? 'block' : undefined,
  }),
);

export const TextButton = styled('button')`
  background: transparent;
  cursor: pointer;
  border-style: none;
  font-size: 100%;
`;

export const ButtonLink = Button.withComponent(Link);
