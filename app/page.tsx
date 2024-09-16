// Home.tsx
import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '../components/Button';

const Home: FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <Link href="/login">
          <Button variant="default" size="default">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" size="default">Signup</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;