import { Meetings, UserRole } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import moment from "moment";

type meetingsprops = {
  meetings: Meetings[];
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  const meetings = await prisma.meetings.findMany({
    where: {
      //@ts-ignore
      studentId: session?.id,
    },
    include: {
      TG: true,
    },
  });

  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { meetings: JSON.parse(JSON.stringify(meetings)) },
  });
};

export default function MeetingsPage({ meetings }: meetingsprops) {
  return (
    <StudentsLayout>
      {meetings.map((meeting) => (
        <div>
          {meetings.map((meeting) => (
            <div key={meeting.id}>
              <div className="flex flex-col break-words min-h-[13rem] w-[25rem] font-semibold mt-10 mr-10 border border-black p-5 rounded">
                <div className="flex items-center">
                  <div className="text-3xl mb-2 font-bold p-1">
                    {meeting.title}
                  </div>
                </div>
                <div className=" text-slate-700">{`Recorded At : ${moment(
                  meeting.createdAt
                ).format("MMMM Do YYYY, h:mm:ss a")}`}</div>
                <div className=" text-slate-700">{`Created By : ${
                  //@ts-ignore
                  meeting?.TG.name
                }`}</div>

                <div className="mt-2 text-justify text-lg">
                  {meeting.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </StudentsLayout>
  );
}
