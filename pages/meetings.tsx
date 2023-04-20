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
            <div className="bg-white p-4 w-full lg:min-w-[75rem]">
                <p className="flex items-center text-2xl font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Meetings
                </p>
                {meetings.map((meeting) => (
                    <div key={meeting.id}>
                        <div className="flex flex-col break-words min-h-[13rem] w-[25rem] font-semibold mt-10 mr-10 border border-black p-5 rounded">
                            <div className="flex items-center">
                                <div className="text-3xl mb-2 font-bold p-1">{meeting.title}</div>
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
        </StudentsLayout>
    );
}
