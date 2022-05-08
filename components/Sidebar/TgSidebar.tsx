import { BiHome, BiUser, BiChat, BiLogOut, BiLogIn } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsTable } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

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
    <div className="flex flex-col justify-around items-center py-64 w-16 h-screen bg-[#1E1D1D] text-white text-3xl px-7">
      <div
        className={
          isActive(`/${session?.role}`) ? "bg-purple-500 rounded-md p-2" : ""
        }
      >
        <Link href={`/${session?.role}`}>
          <a>
            <BiHome />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive(`/${session?.role}/user`)
            ? "bg-purple-500 rounded-md p-2"
            : ""
        }
      >
        <Link href={`/${session?.role}/user`}>
          <a>
            <BiUser />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive(`/${session?.role}/notifications`)
            ? "bg-purple-500 rounded-md p-2"
            : ""
        }
      >
        <Link href={`/${session?.role}/notifications`}>
          <a>
            <IoNotificationsOutline />
          </a>
        </Link>
      </div>

      <div
        className={
          isActive(`/${session?.role}/students`)
            ? "bg-purple-500 rounded-md p-2"
            : ""
        }
      >
        <Link href={`/${session?.role}/students`}>
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
          isActive(`/${session?.role}/settings`)
            ? "bg-purple-500 rounded-md p-2"
            : ""
        }
      >
        <Link href={`/${session?.role}/settings`}>
          <a>
            <FiSettings />
          </a>
        </Link>
      </div>

      <div
        className={isActive("/logout") ? "bg-purple-500 rounded-md p-2" : ""}
      >
        <Link
          href={
            session?.user
              ? `/api/auth/signout`
              : `/api/${session?.role}/auth/signin`
          }
        >
          <a>{session?.user ? <BiLogOut /> : <BiLogIn />}</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
