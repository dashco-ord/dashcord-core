import { BiHome, BiUser, BiChat, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsTable } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className='flex flex-col justify-around items-center py-64 w-16 h-screen bg-[#1E1D1D] text-white text-3xl px-7'>
      <BiHome />
      <BiUser />
      <IoNotificationsOutline />
      <BsTable />
      <BiChat />
      <FiSettings />
      <BiLogOut />
    </div>
  );
};

export default Sidebar;
