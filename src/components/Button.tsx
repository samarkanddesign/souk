import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const buttonColor = '#333';

export const Button = styled('button', {
  shouldForwardProp: prop => prop !== 'isFullWidth',
})<{ isFullWidth?: boolean }>(
  {
    padding: '1rem 2rem',
    backgroundColor: buttonColor,
    border: `2px solid ${buttonColor}`,
    '&:hover': {
      backgroundColor: '#444',
      borderColor: '#444',
    },

    cursor: 'pointer',
    color: '#fff',
    fontSize: '100%',
    textDecoration: 'none',
    textAlign: 'center',
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
