import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { greys } from './style';

export const Button = styled('button')({
  padding: '1rem 2rem',
  backgroundColor: greys.b,
  border: `2px solid ${greys.b}`,
  '&:hover': {
    backgroundColor: greys.c,
    borderColor: greys.c,
  },
  lineHeight: 1,
  verticalAlign: 'bottom',
  cursor: 'pointer',
  color: '#fff',
  fontSize: '100%',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
});

export const FullWidthButton = styled(Button)`
  width: 100%;
  display: block;
`;

export const TextButton = styled('button')`
  background: transparent;
  cursor: pointer;
  border-style: none;
  font-size: 100%;
`;

export const ButtonLink = Button.withComponent(Link);
export const FullWidthButtonLink = FullWidthButton.withComponent(Link);
