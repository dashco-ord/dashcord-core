import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const HodSidebar = () => {
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
    <div className="flex flex-col pt-8 pb-5 lg:items-center lg:w-16 h-screen bg-white text-3xl lg:px-7 px-4 overflow-y-scroll">
      <div className="mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle r={20} fill="#000028" />
          <circle cx={30} cy={30} r={20} fill="#000028" />
        </svg>
      </div>
      <div
        className={`my-5 p-2 ${
          isActive(`/hod`) ? "bg-purple-500 rounded-md text-white" : ""
        }`}
      >
        <Link href={`/hod`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">Dashboard</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2 ${
          isActive(`/hod/user`) ? "bg-purple-500 rounded-md  text-white" : ""
        }`}
      >
        <Link href={`/hod/user`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">User</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2
         ${
           isActive(`/hod/reports`) ? "bg-purple-500 rounded-md text-white" : ""
         }`}
      >
        <Link href={`/hod/reports`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">Reports</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2 ${
          isActive(`/hod/tgs`) ? "bg-purple-500 rounded-md text-white" : ""
        }`}
      >
        <Link href={`/hod/tgs`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">TGs list</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2 ${
          isActive(`/hod/students`) ? "bg-purple-500 rounded-md text-white" : ""
        }`}
      >
        <Link href={`/hod/students`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">Students list</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2 ${
          isActive(`/hod/analytics`)
            ? "bg-purple-500 rounded-md text-white"
            : ""
        }`}
      >
        <Link href={`/hod/analytics`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">Analytics</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 mt-auto p-2 ${
          isActive(`/hod/settings`) ? "bg-purple-500 rounded-md text-white" : ""
        }`}
      >
        <Link href={`/hos/settings`}>
          <a className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="lg:hidden text-[1.5rem] ml-2">Settings</p>
          </a>
        </Link>
      </div>

      <div
        className={`my-5 p-2 ${
          isActive("/logout") ? "bg-purple-500 rounded-md text-white" : ""
        }`}
      >
        <Link
          href={
            session?.user ? `/api/hod/auth/signout` : `/api/hod/auth/signin`
          }
        >
          <a className="flex items-center">
            {session?.user ? (
              <>
                <svg
                  id="logout"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <p className="lg:hidden text-[1.5rem] ml-2">Logout</p>
              </>
            ) : (
              <svg
                id="login"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            )}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HodSidebar;
