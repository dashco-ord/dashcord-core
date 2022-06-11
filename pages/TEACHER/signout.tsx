import Head from "next/head";
import { signOut } from "next-auth/react";

const SignoutPage = () => {
  return (
    <div>
      <Head>
        <title>Signout</title>
      </Head>
      <main className='w-full h-screen flex items-center justify-center bg-slate-100'>
        <div className='bg-white border-2 min-w-[25rem] min-h-[15rem] rounded-md shadow-sm p-8'>
          <h1 className='font-bold text-4xl mb-9'>Signout ?</h1>
          <p className=' mb-11'>Do you really want to signout ?</p>
          <button
            id='signout'
            className='bg-purple-500 text-white p-2 font-bold text-xl rounded-full'
            onClick={() =>
              signOut({
                callbackUrl: `/`,
              })
            }>
            signout
          </button>
        </div>
      </main>
    </div>
  );
};

export default SignoutPage;
