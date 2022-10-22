import { UserRole } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import GlobalFeed from "components/Shareview/Global";
import { checkUserRoleAndRedirect } from "lib/checks";
import { useState } from "react";

export async function getServerSideProps(context: any) {
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {});
}

export default function Experience() {
  const [view, setView] = useState("global");

  return (
    <StudentsLayout>
      <div className='w-full bg-white min-h-full lg:min-w-[40rem] lg:min-h-[20rem] rounded-md shadow-none p-4'>
        <h1 className='font-bold text-2xl'>Shareview</h1>
        <q className='text-sm text-slate-400'>
          A place for students to share their interview experiences & some
          placement material
        </q>

        <div className='mt-5 border border-slate-400 flex rounded w-fit text-sm lg:text-md'>
          <p
            className={`border-r-2 pr-1 p-1 ${
              view === "global" ? "bg-purple-500 text-white" : "text-slate-400"
            }`}
            onClick={() => setView("global")}>
            Global Feed
          </p>
          <p
            className={`border-r-2 pr-1 p-1 ${
              view === "personal"
                ? "bg-purple-500 text-white"
                : "text-slate-400"
            }`}
            onClick={() => setView("personal")}>
            Personal Feed
          </p>
          <p
            className={` pr-1 p-1 ${
              view === "post" ? "bg-purple-500 text-white" : "text-slate-400"
            }`}
            onClick={() => setView("post")}>
            Post experience
          </p>
        </div>

        {view === "global" && <GlobalFeed />}
      </div>
    </StudentsLayout>
  );
}
