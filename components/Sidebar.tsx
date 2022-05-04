import { BiHome, BiUser, BiChat, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsTable } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='flex flex-col justify-around items-center py-64 w-16 h-screen bg-[#1E1D1D] text-white text-3xl px-7'>
      <div className={isActive("/") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/"}>
          <a>
            <BiHome />
          </a>
        </Link>
      </div>

      <div className={isActive("/user") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/user"}>
          <a>
            <BiUser />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive("/notifications") ? "bg-purple-500 rounded-md p-2" : ""
        }>
        <Link href={"/notifications"}>
          <a>
            <IoNotificationsOutline />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/students") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/students"}>
          <a>
            <BsTable />
          </a>
        </Link>
      </div>

      <div className={isActive("/chat") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/chat"}>
          <a>
            <BiChat />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/settings") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/settings"}>
          <a>
            <FiSettings />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/logout") ? "bg-purple-500 rounded-md p-2" : ""}>
        <Link href={"/api/auth/logout"}>
          <a>
            <BiLogOut />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
