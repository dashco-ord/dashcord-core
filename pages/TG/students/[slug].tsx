import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import {
  Student,
  Subjects,
  FamilyDetails,
  Friends,
  Attendance,
} from "@prisma/client";
import PersonalDetailForm from "components/Forms/PersonalDetail";
import FamilyDetailForm from "components/Forms/FamilyDetail";
import FriendsDetailForm from "components/Forms/FriendsDetail";
import AttendanceTable from "components/Table/AttendanceTable";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
// import { Radar } from "react-chartjs-2";
// import { students } from "prisma/data";

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
    },
  };
}

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

const SingleStudentPage = ({
  student,
  familyDetails,
  friends,
}: StudentPageProps) => {
  // const data = {
  //   labels: [Subjects.AI, Subjects.SEPM, Subjects.CN, Subjects.DP, Subjects.FE],
  //   datasets: [
  //     {
  //       label: "UT",
  //       data: [10, 14, 12, 15, 17],
  //       backgroundColor: "rgba(128, 0, 128, 0.2)",
  //       pointHoverBackgroundColor: "#fff",
  //       borderColor: "rgb(54, 162, 235)",
  //     },
  //     {
  //       label: "MSE",
  //       data: [25, 15, 22, 20, 20],
  //       backgroundColor: "rgba(255, 99, 128, 0.2)",
  //       pointHoverBackgroundColor: "#fff",
  //     },
  //     {
  //       label: "ESE",
  //       data: [35, 25, 28, 32, 22],
  //       backgroundColor: "rgba(0, 0, 254, 0.2)",
  //       pointHoverBackgroundColor: "#fff",
  //     },
  //   ],
  //   options: {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           // This more specific font property overrides the global property
  //           font: {
  //             size: 500,
  //             weight: "bold",
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

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
};
