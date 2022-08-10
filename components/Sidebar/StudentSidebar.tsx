import { useRouter } from "next/router";

const StudentSidebar = () => {
  const router = useRouter();
  const isActive = (route: string) => {
    if (route === router.pathname) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex flex-col pt-8 pb-5 items-center w-16 h-screen bg-white text-3xl px-7 ">
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
    </div>
  );
};

export default StudentSidebar;
