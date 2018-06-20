import * as React from 'react';

interface Props {}

export default function NotFound({  }: Props) {
  return (
    <div>
      <h1>404 Not Found 🔎</h1>
      <p>
        Oh no! The page you were looking for doesn't exist 🤷‍♂️. Try somewhere
        else.
      </p>
    </div>
  );
}
