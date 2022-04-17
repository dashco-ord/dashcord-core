import type { NextPage } from "next";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const { user, isLoading, error } = useUser();
  return (
    <div>
      {user ? (
        <>
          <h1 className='font-bold'>{user.name}</h1>
          <p>
            {user.email},{user.email_verified && <p> is Verified</p>}
          </p>
          <Image
            className='rounded-full'
            src={user.picture}
            alt={user.name}
            height={155}
            width={155}
          />
          <br />
          <Link href='/api/auth/logout'>
            <a>logout</a>
          </Link>
        </>
      ) : (
        <Link href='/api/auth/login'>
          <a>Login</a>
        </Link>
      )}
    </div>
  );
};

export default Home;
