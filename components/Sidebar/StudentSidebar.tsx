import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

const StudentSidebar = () => {
    const router = useRouter();
    const isActive = (route: string) => {
        if (route === router.pathname) {
            return true;
        } else {
            return false;
        }
    };

    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`flex h-screen ${open ? "transition ease-in delay-100 w-64" : "w-24 items-center"
                } flex-col  overflow-x-hidden overflow-y-scroll bg-white px-7 pt-8 pb-5 text-3xl`}
            onMouseEnter={() => setOpen(!open)}
            onMouseLeave={() => setOpen(!open)}
        >
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
                className={`my-4 ${isActive(`/`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/`}>
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
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Home</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/user`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    } `}
            >
                <Link href={`/user`}>
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
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">User</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4
         ${isActive(`/tasks`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/tasks`}>
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
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Tasks</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/goals`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/goals`}>
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
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Goals</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/meetings`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/meetings`}>
                    <a className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Meetings</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/shareview`)
                        ? "rounded-md bg-purple-500 p-1 text-white"
                        : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/shareview`}>
                    <a className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Shareview</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/resources`)
                        ? "rounded-md bg-purple-500 p-1 text-white"
                        : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/resources`}>
                    <a className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Resources</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive(`/events`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/events`}>
                    <a className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                            />
                        </svg>
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Events</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 mt-auto ${isActive(`/settings`) ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={`/settings`}>
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
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Setings</p> : ""}
                    </a>
                </Link>
            </div>

            <div
                className={`my-4 ${isActive("/logout") ? "rounded-md bg-purple-500 p-1 text-white" : "hover:bg-purple-300 hover:rounded-md p-1"
                    }`}
            >
                <Link href={session?.user ? `/api/auth/signout` : `/api/tg/auth/login`}>
                    <a className="flex items-center">
                        {session?.user ? (
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
                        {open ? <p className="ml-3 text-[1.1rem] font-semibold">Logout</p> : ""}
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default StudentSidebar;
