import { UserRole } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";

const LoginPage = ({ csrfToken }: any) => {
  const [view, setView] = useState<UserRole>(UserRole.STUDENT);

  return (
    <div className='flex flex-col justify-center items-center lg:h-screen'>
      <div className='text-sm font-medium text-center text-black border-b border-gray-300 '>
        <ul className='flex flex-wrap -mb-px'>
          <li
            className={`mr-1 inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer ${
              view == UserRole.STUDENT
                ? "text-purple-700 border-purple-700"
                : "hover:text-purple-700 hover:border-purple-700"
            }`}
            onClick={() => {
              setView(UserRole.STUDENT);
            }}>
            <p>Student</p>
          </li>
          <li
            className={`mr-1 inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer ${
              view == UserRole.TG
                ? "text-purple-700 border-purple-700"
                : "hover:text-purple-700 hover:border-purple-700"
            }`}
            onClick={() => {
              setView(UserRole.TG);
            }}>
            <p>Teachers</p>
          </li>
          <li
            className={`mr-1 inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer ${
              view == UserRole.INCHARGE
                ? "text-purple-700 border-purple-700"
                : "hover:text-purple-700 hover:border-purple-700"
            }`}
            onClick={() => {
              setView(UserRole.INCHARGE);
            }}>
            <p>Incharge</p>
          </li>
          <li
            className={`mr-1 inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer ${
              view == UserRole.TNP
                ? "text-purple-700 border-purple-700"
                : "hover:text-purple-700 hover:border-purple-700"
            }`}
            onClick={() => {
              setView(UserRole.TNP);
            }}>
            <p>T&P</p>
          </li>
          <li
            className={`mr-1 inline-block p-4 rounded-t-lg border-b-2 border-transparent cursor-pointer ${
              view == UserRole.HOD
                ? "text-purple-700 border-purple-700"
                : "hover:text-purple-700 hover:border-purple-700"
            }`}
            onClick={() => {
              setView(UserRole.HOD);
            }}>
            <p>HOD</p>
          </li>
        </ul>
      </div>
      <div>
        {view === UserRole.STUDENT ? (
          <div className='flex flex-col p-5 w-full items-center justify-center'>
            <form
              className=' border-2 border-slate-200 p-10 rounded-lg'
              method='post'
              action='/api/auth/callback/credentials'>
              {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

              <div className='flex flex-col pb-6'>
                <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  id='email'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  required
                  name='email'
                />
              </div>

              <div className='flex flex-col pb-3'>
                <div className='flex flex-wrap items-baseline'>
                  <label className='text-xl text-slate-600 font-semibold mr-auto pb-2'>
                    Password :
                  </label>
                  <div>
                    <Link href='/password/forgot'>
                      <a className='text-sm text-purple-500'>
                        Forgot password ?
                      </a>
                    </Link>
                  </div>
                </div>

                <input
                  id='password'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='password'
                  placeholder='Enter your Password'
                  required
                  name='password'
                />
              </div>

              <input
                id='login'
                className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
                type='submit'
                value='Sign In'
                required
              />
              <p className='text-slate-600 mt-5'>
                {"Got no account ? here "}
                <Link href='/signup'>
                  <a className='text-blue-500 hover:underline'>sign up</a>
                </Link>
                {" for one"}
              </p>
            </form>
          </div>
        ) : view === UserRole.TG ? (
          <div className='flex flex-col p-5 w-full items-center justify-center'>
            <form
              className=' border-2 border-slate-200 p-10 rounded-lg'
              method='post'
              action='/api/tg/auth/callback/credentials'>
              {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

              <div className='flex flex-col pb-6'>
                <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  id='email'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  required
                  name='email'
                />
              </div>

              <div className='flex flex-col pb-3'>
                <div className='flex flex-wrap items-baseline'>
                  <label className='text-xl text-slate-600 font-semibold mr-auto pb-2'>
                    Password :
                  </label>
                  <div>
                    <Link href='/password/forgot'>
                      <a className='text-sm text-purple-500'>
                        Forgot password ?
                      </a>
                    </Link>
                  </div>
                </div>

                <input
                  id='password'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='password'
                  placeholder='Enter your Password'
                  required
                  name='password'
                />
              </div>

              <input
                id='login'
                className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
                type='submit'
                value='Sign In'
                required
              />
              <p className='text-slate-600 mt-5'>
                {"Got no account ? here "}
                <Link href='/signup'>
                  <a className='text-blue-500 hover:underline'>sign up</a>
                </Link>
                {" for one"}
              </p>
            </form>
          </div>
        ) : view === UserRole.INCHARGE ? (
          <div className='flex flex-col p-5 w-full items-center justify-center'>
            <form
              className=' border-2 border-slate-200 p-10 rounded-lg'
              method='post'
              action='/api/incharge/auth/callback/credentials'>
              {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

              <div className='flex flex-col pb-6'>
                <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  id='email'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  required
                  name='email'
                />
              </div>

              <div className='flex flex-col pb-3'>
                <div className='flex flex-wrap items-baseline'>
                  <label className='text-xl text-slate-600 font-semibold mr-auto pb-2'>
                    Password :
                  </label>
                  <div>
                    <Link href='/password/forgot'>
                      <a className='text-sm text-purple-500'>
                        Forgot password ?
                      </a>
                    </Link>
                  </div>
                </div>

                <input
                  id='password'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='password'
                  placeholder='Enter your Password'
                  required
                  name='password'
                />
              </div>

              <input
                id='login'
                className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
                type='submit'
                value='Sign In'
                required
              />
              <p className='text-slate-600 mt-5'>
                {"Got no account ? here "}
                <Link href='/signup'>
                  <a className='text-blue-500 hover:underline'>sign up</a>
                </Link>
                {" for one"}
              </p>
            </form>
          </div>
        ) : view === UserRole.TNP ? (
          <div className='flex flex-col p-5 w-full items-center justify-center'>
            <form
              className=' border-2 border-slate-200 p-10 rounded-lg'
              method='post'
              action='/api/tnp/auth/callback/credentials'>
              {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

              <div className='flex flex-col pb-6'>
                <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  id='email'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  required
                  name='email'
                />
              </div>

              <div className='flex flex-col pb-3'>
                <div className='flex flex-wrap items-baseline'>
                  <label className='text-xl text-slate-600 font-semibold mr-auto pb-2'>
                    Password :
                  </label>
                  <div>
                    <Link href='/password/forgot'>
                      <a className='text-sm text-purple-500'>
                        Forgot password ?
                      </a>
                    </Link>
                  </div>
                </div>

                <input
                  id='password'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='password'
                  placeholder='Enter your Password'
                  required
                  name='password'
                />
              </div>

              <input
                id='login'
                className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
                type='submit'
                value='Sign In'
                required
              />
              <p className='text-slate-600 mt-5'>
                {"Got no account ? here "}
                <Link href='/signup'>
                  <a className='text-blue-500 hover:underline'>sign up</a>
                </Link>
                {" for one"}
              </p>
            </form>
          </div>
        ) : view === UserRole.HOD ? (
          <div className='flex flex-col p-5 w-full items-center justify-center'>
            <form
              className=' border-2 border-slate-200 p-10 rounded-lg'
              method='post'
              action='/api/hod/auth/callback/credentials'>
              {/* This hidden input field is need for passing csrfToken that is received from getServerSidePRops */}
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />

              <div className='flex flex-col pb-6'>
                <label className='text-xl text-slate-600 font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  id='email'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  required
                  name='email'
                />
              </div>

              <div className='flex flex-col pb-3'>
                <div className='flex flex-wrap items-baseline'>
                  <label className='text-xl text-slate-600 font-semibold mr-auto pb-2'>
                    Password :
                  </label>
                  <div>
                    <Link href='/password/forgot'>
                      <a className='text-sm text-purple-500'>
                        Forgot password ?
                      </a>
                    </Link>
                  </div>
                </div>

                <input
                  id='password'
                  className='p-2 rounded-sm border-b-2 border-b-gray-300 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 bg-slate-100 duration-75'
                  type='password'
                  placeholder='Enter your Password'
                  required
                  name='password'
                />
              </div>

              <input
                id='login'
                className='mt-5 p-2 w-24 text-white text-md font-semibold bg-purple-500 rounded-full'
                type='submit'
                value='Sign In'
                required
              />
              <p className='text-slate-600 mt-5'>
                {"Got no account ? here "}
                <Link href='/signup'>
                  <a className='text-blue-500 hover:underline'>sign up</a>
                </Link>
                {" for one"}
              </p>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
