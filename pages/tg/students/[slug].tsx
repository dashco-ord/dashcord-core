import TgsLayout from "components/Layouts/TgsLayout";
import { prisma } from "lib/prisma";
import {
  Student,
  FamilyDetails,
  Friends,
  Attendance,
  Goals,
  GoalType,
  Assesments,
  UserRole,
  Meetings,
} from "@prisma/client";
import PersonalDetailForm from "components/DataForms/PersonalDetail";
import FamilyDetailForm from "components/DataForms/FamilyDetail";
import FriendsDetailForm from "components/DataForms/FriendsDetail";
import AttendanceTable from "components/Tables/AttendanceTable";
import { useState } from "react";
import { checkUserRoleAndRedirect } from "lib/checks";
import AssesmentGraphs from "components/Graphs/AssesmentGraphs";
import MeetingsComponent from "components/meetings";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const rawStudent = await prisma.student.findUnique({
    where: {
      rollNo: params.slug,
    },
    include: {
      familyDetails: true,
      Attendance: true,
      Goals: true,
      Friends: true,
      Assesments: true,
      Meetings: true,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.TG, {
    extra: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      familyDetails: JSON.parse(JSON.stringify(rawStudent?.familyDetails)),
      friends: JSON.parse(JSON.stringify(rawStudent?.Friends)),
      goals: JSON.parse(JSON.stringify(rawStudent?.Goals)),
      assesments: JSON.parse(JSON.stringify(rawStudent?.Assesments)),
      meetings: JSON.parse(JSON.stringify(rawStudent?.Meetings)),
    },
  });
}

const SingleStudentPage = ({
  student,
  familyDetails,
  friends,
  goals,
  assesments,
  meetings,
}: StudentPageProps) => {
  const [personalView, setPersonalView] = useState(true);
  const [statsView, setStatsView] = useState(false);
  const [goalsView, setGoalsView] = useState(false);
  const [meetingView, setMeetingView] = useState(false);

  return (
    <TgsLayout>
      <main>
        <ul className='flex list-none'>
          <li
            className={`p-2 px-2 cursor-pointer flex ${
              personalView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setGoalsView(false);
              setStatsView(false);
              setMeetingView(false);
              setPersonalView(true);
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Personal Detail
          </li>
          <li
            className={`p-2 px-2 cursor-pointer flex ${
              statsView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setPersonalView(false);
              setGoalsView(false);
              setMeetingView(false);
              setStatsView(true);
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
              />
            </svg>
            Stats
          </li>
          <li
            className={`p-2 px-2 cursor-pointer flex ${
              meetingView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setPersonalView(false);
              setGoalsView(false);
              setStatsView(false);
              setMeetingView(true);
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
              />
            </svg>
            Meeting Details
          </li>
          <li
            className={`p-2 pr-2 px-2 cursor-pointer flex ${
              goalsView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setStatsView(false);
              setPersonalView(false);
              setMeetingView(false);
              setGoalsView(true);
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
              />
            </svg>
            Goals
          </li>
        </ul>
        <div className='flex flex-wrap bg-white rounded-lg rounded-tl-none p-8'>
          <div className={personalView ? "" : "hidden"}>
            <PersonalDetailForm noSave={true} student={student} />
          </div>
          <div className={personalView ? "" : "hidden"}>
            <FamilyDetailForm noSave={true} familyDetails={familyDetails} />
            {
              //@ts-ignore2
              friends?.collegeFriend && (
                <FriendsDetailForm
                  noSave={true}
                  friends={friends}
                  username={student.name}
                />
              )
            }

            <AttendanceTable
              attendance={
                //@ts-ignore
                student.Attendance
              }
            />
          </div>

          {/* Graph's */}
          <div className={`flex flex-col ${statsView ? "" : "hidden"}`}>
            <AssesmentGraphs assesments={assesments} student={student} />
          </div>

          {/* Meetings */}
          <MeetingsComponent meetings={meetings} />

          {/* Goals */}
          <div
            className={`w-full flex flex-wrap flex-col ${
              goalsView ? "" : "hidden"
            }`}>
            <div>
              <h2 className='text-2xl font-bold'>Current Goals : </h2>
              <div className='flex flex-wrap'>
                {goals
                  .slice(0)
                  .reverse()
                  .map((goal) => (
                    <div key={goal.id}>
                      <div className='flex flex-col break-words w-[20rem] font-semibold mt-5 mr-10 border border-black p-5 rounded-lg'>
                        <div className='flex items-center'>
                          <div className='text-3xl mb-2 font-bold p-1'>
                            {goal.title}
                          </div>
                          <div
                            className={`ml-auto border p-1 px-2 w-fit text-sm rounded-full ${
                              goal.type == GoalType.LongTerm
                                ? "border-yellow-400 text-yellow-400"
                                : "border-green-400 text-green-400"
                            }`}>
                            {goal.type}
                          </div>
                        </div>
                        <div className='flex'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          <div className='ml-2'>{goal.deadline}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </TgsLayout>
  );
};

export default SingleStudentPage;

type StudentPageProps = {
  student: Student;
  familyDetails: FamilyDetails;
  friends: Friends;
  attendance: Attendance;
  goals: Goals[];
  assesments: Assesments[];
  meetings: Meetings[];
};
