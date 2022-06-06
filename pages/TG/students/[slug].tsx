import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import {
  Student,
  Subjects,
  FamilyDetails,
  Friends,
  Attendance,
  Goals,
  GoalType,
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
} from "chart.js";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Radar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

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
      Attendance: true,
      Exams: true,
      Goals: true,
    },
  });

  const familyDetails = await prisma.familyDetails.findUnique({
    where: {
      //@ts-ignore
      id: rawStudent?.familyDetailsId,
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
      familyDetails: JSON.parse(JSON.stringify(familyDetails)),
      friends: JSON.parse(JSON.stringify(friends)),
      goals: JSON.parse(JSON.stringify(rawStudent?.Goals)),
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
  LinearScale
);

const SingleStudentPage = ({
  student,
  familyDetails,
  friends,
  goals,
}: StudentPageProps) => {
  const data = {
    labels: [Subjects.AI, Subjects.SEPM, Subjects.CN, Subjects.DP, Subjects.FE],
    datasets: [
      {
        label: "UT",
        data: [10, 14, 12, 15, 17],
        backgroundColor: "rgba(128, 0, 128, 0.2)",
        pointHoverBackgroundColor: "#fff",
        borderColor: "rgb(54, 162, 235)",
      },
      {
        label: "MSE",
        data: [25, 15, 22, 20, 20],
        backgroundColor: "rgba(255, 99, 128, 0.2)",
        pointHoverBackgroundColor: "#fff",
      },
      {
        label: "ESE",
        data: [35, 25, 28, 32, 22],
        backgroundColor: "rgba(0, 0, 254, 0.2)",
        pointHoverBackgroundColor: "#fff",
      },
    ],
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalType, setGoalType] = useState<GoalType>();
  const router = useRouter();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const data = {
      id: student.id,
      title,
      description,
      deadline,
      goalType,
    };
    try {
      const res = await axios.post("/api/tg/create-goal", data);
      if (res.status == 200) {
        router.reload();
      }
    } catch (error) {
      //Handle this error
    }
  };

  return (
    <Layout>
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
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mb-4'>Stats : </h1>
            <div className='flex'>
              <div className='w-[30rem] mr-5'>
                <h1 className='text-xl font-bold'>Exam Stats : </h1>
                <Line data={data} />
              </div>
              <div className='w-[30rem] mr-5'>
                {/* <h1 className='text-xl font-bold'>Exam Stats : </h1>
                <Radar data={data} /> */}
              </div>
            </div>
          </div>
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
            <div className='mt-8'>
              <h2 className='text-2xl font-bold'>Create Goals : </h2>
              <form className='mt-5' onSubmit={handleCreate}>
                <div className='flex items-center flex-wrap'>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Goal Title :
                    </label>
                    <input
                      className='w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      type='text'
                      placeholder='Enter Goal Title'
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Goal Description :
                    </label>
                    <textarea
                      className='w-80 h-10 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      placeholder='Enter Goal Description'
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Goal DeadLine :
                    </label>
                    <input
                      className='w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      type='date'
                      placeholder='Enter Goal DeadLine'
                      required
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl font-semibold mr-5 pb-2 md:text-lg'>
                      Goal Type :
                    </label>
                    <select
                      name='select goal Type'
                      className='w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                      onChange={(e) =>
                        setGoalType(
                          //@ts-ignore
                          e.target.value
                        )
                      }
                      required>
                      <option>Select Goal Type</option>
                      <option value={GoalType.LongTerm}>Long Term</option>
                      <option value={GoalType.ShortTerm}>Short Term</option>
                    </select>
                    {/* <input
                      className="w-42 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="date"
                      placeholder="Enter Goal DeadLine"
                      required
                    /> */}
                  </div>
                  <div className='p-2 w-fit h-fit bg-purple-600 rounded-lg'>
                    <input
                      type='submit'
                      className='text-white font-bold'
                      value={`+ Create Goal`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SingleStudentPage;

type StudentPageProps = {
  student: Student;
  familyDetails: FamilyDetails;
  friends: Friends;
  attendance: Attendance;
  goals: Goals[];
};
