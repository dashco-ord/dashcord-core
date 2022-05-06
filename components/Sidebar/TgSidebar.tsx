import { BiHome, BiUser, BiChat, BiLogOut, BiLogIn } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsTable } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebar = () => {
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
    <div className='flex flex-col justify-around items-center py-64 w-16 h-screen bg-[#1E1D1D] text-white text-3xl px-7'>
      <div className={isActive("/tg") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/tg"}>
          <a>
            <BiHome />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/tg/user") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/tg/user"}>
          <a>
            <BiUser />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive("/tg/notifications") ? "bg-purple-500 rounded-md p-2" : ""
        }>
        <Link href={"/tg/notifications"}>
          <a>
            <IoNotificationsOutline />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive("/tg/students") ? "bg-purple-500 rounded-md p-2" : ""
        }>
        <Link href={"/tg/students"}>
          <a>
            <BsTable />
          </a>
        </Link>
      </div>

      {/* <div
        className={isActive("/tg/chat") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/tg/chat"}>
          <a>
            <BiChat />
          </a>
        </Link>
      </div> */}

      <div
        className={
          isActive("/tg/settings") ? "bg-purple-500 rounded-md p-2" : ""
        }>
        <Link href={"/tg/settings"}>
          <a>
            <FiSettings />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/logout") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={session?.user ? "/api/auth/signout" : "/api/auth/signin"}>
          <a>{session?.user ? <BiLogOut /> : <BiLogIn />}</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
