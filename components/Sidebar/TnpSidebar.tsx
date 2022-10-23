import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const TnpSidebar = () => {
  const router = useRouter();
  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    } else {
      return false;
    }
  };

  const { data: session } = useSession();

  return (
    <div className='flex flex-col pt-8 pb-5 items-center w-16 h-screen bg-white text-3xl px-7'>
      <div className='mb-10'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-9 w-9 text-slate-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}>
          <circle r={20} fill='#000028' />
          <circle cx={30} cy={30} r={20} fill='#000028' />
        </svg>
      </div>
      <div
        className={`my-5 ${
          isActive(`/tnp`) ? "bg-purple-500 rounded-md p-2 text-white" : ""
        }`}>
        <Link href={`/tnp`}>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 ${
          isActive(`/tnp/user`) ? "bg-purple-500 rounded-md p-2 text-white" : ""
        }`}>
        <Link href={`/tnp/user`}>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 ${
          isActive(`/tnp/experiences`)
            ? "bg-purple-500 rounded-md p-2 text-white"
            : ""
        }`}>
        <Link href={`/tnp/experiences`}>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-7 h-7'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z'
              />
            </svg>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 mt-auto ${
          isActive(`/tnp/settings`)
            ? "bg-purple-500 rounded-md p-2 text-white"
            : ""
        }`}>
        <Link href={`/tnp/settings`}>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-7 w-7'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 ${
          isActive("/logout") ? "bg-purple-500 rounded-md p-2 text-white" : ""
        }`}>
        <Link
          href={session?.user ? `/api/auth/signout` : `/api/tnp/auth/login`}>
          <a>
            {session?.user ? (
              <svg
                id='logout'
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
            ) : (
              <svg
                id='login'
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                />
              </svg>
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TnpSidebar;
