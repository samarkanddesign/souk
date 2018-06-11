import * as React from 'react';
import Link from 'next/link';

interface Props {}

export default function Navbar({  }: Props) {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/shop">
        <a>Shop</a>
      </Link>
    </nav>
  );
}
