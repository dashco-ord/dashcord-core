import HodLayout from "components/Layout/HodLayout";
import { prisma } from "lib/prisma";
import {
  Student,
  Subjects,
  FamilyDetails,
  Friends,
  Attendance,
  Goals,
  GoalType,
  Assesments,
} from "@prisma/client";
import PersonalDetailForm from "components/Forms/PersonalDetail";
import FamilyDetailForm from "components/Forms/FamilyDetail";
import FriendsDetailForm from "components/Forms/FriendsDetail";
import AttendanceTable from "components/Table/AttendanceTable";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AssesmentType } from "@prisma/client";
import ChartDataLabels from "chartjs-plugin-datalabels";

export async function getStaticPaths() {
  const students = await prisma.student.findMany();
  const paths = students.map((student) => ({
    params: {
      slug: student.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const rawStudent = await prisma.student.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      familyDetails: true,
      Attendance: true,
      Goals: true,
      Friends: true,
      Assesments: true,
    },
  });

  const friends = await prisma.friends.findUnique({
    where: {
      //@ts-ignore
      id: rawStudent?.friendsId,
    },
    include: {
      collegeFriend: true,
    },
  });

  return {
    props: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      familyDetails: JSON.parse(JSON.stringify(rawStudent?.familyDetails)),
      friends: JSON.parse(JSON.stringify(friends)),
      goals: JSON.parse(JSON.stringify(rawStudent?.Goals)),
      assesments: JSON.parse(JSON.stringify(rawStudent?.Assesments)),
    },
    revalidate: 5,
  };
}

ChartJS.register(
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const SingleStudentPage = ({
  student,
  familyDetails,
  friends,
  goals,
  assesments,
}: StudentPageProps) => {
  let data = {
    labels: [Subjects.AI, Subjects.CN, Subjects.DP, Subjects.FE, Subjects.SEPM],
    datasets: [],
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 500,
              weight: "bold",
            },
          },
        },
      },
    },
  };

  assesments.map((assesment) =>
    data.datasets.push(
      //@ts-ignore
      assesment.name == AssesmentType.CAE1
        ? {
            //@ts-ignore
            label: assesment.name,
            //@ts-ignore
            data: [
              assesment.score1,
              assesment.score2,
              assesment.score3,
              assesment.score4,
              assesment.score5,
            ],
            backgroundColor: "rgba(128, 0, 128, 0.5)",
            pointHoverBackgroundColor: "#fff",
            borderColor: "rgba(128, 0, 128, 0.3)",
            datalabels: {
              color: "gray",
              anchor: "end",
              align: "end",
            },
          }
        : assesment.name == AssesmentType.CAE2
        ? {
            //@ts-ignore
            label: assesment.name,
            //@ts-ignore
            data: [
              assesment.score1,
              assesment.score2,
              assesment.score3,
              assesment.score4,
              assesment.score5,
            ],
            backgroundColor: "rgba(128, 0, 254, 0.5)",
            pointHoverBackgroundColor: "#fff",
            borderColor: "rgba(128, 0, 128, 0.3)",
            datalabels: {
              color: "gray",
              anchor: "end",
              align: "end",
            },
          }
        : {
            label: assesment.name,
            //@ts-ignore
            data: [],
          }
    )
  );

  const overallData = {
    labels: [
      "Sem 1",
      "Sem 2",
      "Sem 3",
      "Sem 4",
      "Sem 5",
      "Sem 6",
      "Sem 7",
      "Sem 8",
    ],
    datasets: [
      {
        label: "Overall",
        data: [
          student.sem1Score,
          student.sem2Score,
          student.sem3Score,
          student.sem4Score,
          student.sem5Score,
          student.sem6Score,
          student.sem7Score,
          student.sem8Score,
        ],
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        datalabels: {
          color: "gray",
          anchor: "end",
          align: "end",
        },
      },
    ],
  };

  return (
    <HodLayout>
      <main>
        <div className='flex flex-wrap bg-white rounded-lg p-8'>
          <div>
            <PersonalDetailForm student={student} />
          </div>
          <div>
            <FamilyDetailForm familyDetails={familyDetails} />
            <FriendsDetailForm friends={friends} username={student.name} />
            <AttendanceTable
              attendance={
                //@ts-ignore
                student.Attendance
              }
            />
          </div>

          {/* Graph's */}
          <div className='flex flex-col mt-5'>
            <h1 className='text-2xl font-semibold mb-4'>Stats : </h1>
            <div className='flex'>
              <div className='w-[30rem] mr-5'>
                <h1 className='text-xl font-bold'>
                  Overall assesment Stats :{" "}
                </h1>
                <Bar
                  //@ts-ignore
                  data={overallData}
                />
              </div>
              <div className='w-[30rem] mr-5'>
                <h1 className='text-xl font-bold'>Assesment Stats : </h1>
                <Bar data={data} />
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className='w-full flex flex-wrap flex-col'>
            <div>
              <h2 className='text-2xl font-bold mt-8'>Current Goals : </h2>
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
    </HodLayout>
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
};
