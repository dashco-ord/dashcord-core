import HodsLayout from "components/Layouts/HodsLayout";
import { prisma } from "lib/prisma";
import {
  Student,
  FamilyDetails,
  Friends,
  Attendances,
  Goals,
  GoalType,
  Assesments,
  UserRole,
} from "@prisma/client";
import PersonalDetailForm from "components/DataForms/PersonalDetail";
import FamilyDetailForm from "components/DataForms/FamilyDetail";
import FriendsDetailForm from "components/DataForms/FriendsDetail";
import AttendanceTable from "components/Tables/AttendanceTable";
import { useState } from "react";
import { checkUserRoleAndRedirect } from "lib/checks";
import AssesmentGraphs from "components/Graphs/AssesmentGraphs";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const rawStudent = await prisma.student.findUnique({
    where: {
      rollNo: params.slug,
    },
    include: {
      familyDetails: true,
      Goals: true,
      Friends: true,
      Assesments: true,
      Attendances: {
        orderBy: {
          date: "asc",
        },
      },
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.HOD, {
    extra: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      attendances: JSON.parse(JSON.stringify(rawStudent?.Attendances)),
      familyDetails: JSON.parse(JSON.stringify(rawStudent?.familyDetails)),
      friends: JSON.parse(JSON.stringify(rawStudent?.Friends)),
      goals: JSON.parse(JSON.stringify(rawStudent?.Goals)),
      assesments: JSON.parse(JSON.stringify(rawStudent?.Assesments)),
    },
  });
}
const SingleStudentPage = ({
  student,
  attendances,
  familyDetails,
  friends,
  goals,
  assesments,
}: StudentPageProps) => {
  const [personalView, setPersonalView] = useState(true);
  const [statsView, setStatsView] = useState(false);
  const [goalsView, setGoalsView] = useState(false);

  return (
    <HodsLayout>
      <main>
        <ul className='flex list-none'>
          <li
            className={`p-2 px-2 cursor-pointer flex ${
              personalView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setGoalsView(false);
              setStatsView(false);
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
            className={`p-2 pr-2 px-2 cursor-pointer flex ${
              goalsView ? "bg-white rounded-t-md text-purple-600" : ""
            }`}
            onClick={() => {
              setStatsView(false);
              setPersonalView(false);
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
              attendances={
                //@ts-ignore
                student.Attendances
              }
            />
          </div>

          {/* Graph's */}
          <div className={`flex flex-col ${statsView ? "" : "hidden"}`}>
            <AssesmentGraphs assesments={assesments} student={student} />
          </div>

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
    </HodsLayout>
  );
};

export default SingleStudentPage;

type StudentPageProps = {
  student: Student;
  familyDetails: FamilyDetails;
  friends: Friends;
  attendances: Attendances[];
  goals: Goals[];
  assesments: Assesments[];
};
