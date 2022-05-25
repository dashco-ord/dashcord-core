import Layout from "components/Layout/TgLayout";
import validateUser from "lib/validateUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    validateUser(session?.role);
  }, [session]);

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <h1 className='text-3xl font-bold sm:text-2xl' id='heading'>
        Please{" "}
        <Link href='/login'>
          <a className='text-blue-500 underline'>Login</a>
        </Link>{" "}
        first
      </h1>
    </div>
  );
};

export default HomePage;
