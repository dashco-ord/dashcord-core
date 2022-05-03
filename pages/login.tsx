import Link from "next/link";

const LoginPage = () => {
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
      <form className=' border-2 border-slate-200 p-10 rounded-lg lg:w-1/5 sm:w-10/12 xl:w-1/5 '>
        <div className='flex flex-col pb-5'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Email :{" "}
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='email'
            placeholder='Enter your Email'
            required
          />
        </div>

        <div className='flex flex-col pb-2'>
          <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
            Password :{" "}
          </label>
          <input
            className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
            type='password'
            placeholder='Enter your Password'
            required
          />
        </div>
        <p className='text-slate-600 mt-3'>
          {"Got no account ? here "}
          <Link href='/signup'>
            <a className='text-blue-500 hover:underline'>sign up</a>
          </Link>
          {" for one"}
        </p>
        <input
          className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
          type='submit'
          value='Sign In'
          required
        />
      </form>
    </div>
  );
};

export default LoginPage;
