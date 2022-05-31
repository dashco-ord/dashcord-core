import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import { Student, Subjects, FamilyDetails } from "@prisma/client";
import moment from "moment";
import Table from "components/Table/Table";
import attendanceColors from "components/AttendanceColor";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { students } from "prisma/data";
interface studentProps extends Student {
  student: Student;
  familyDetails: FamilyDetails;
}

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
    where: { id: rawStudent.familyDetailsId },
  });
  const friends = await prisma.friends.findUnique({
    where: {
      id: rawStudent.friendsId,
    },
    include: {
      collegeFriend: true,
    },
  });
  console.log(friends);
  return {
    props: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      familyDetails: JSON.parse(JSON.stringify(familyDetails)),
      friends: JSON.parse(JSON.stringify(friends)),
    },
  };
}

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SingleStudentPage = ({
  student,
  familyDetails,
  friends,
}: studentProps) => {
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

  return (
    <Layout>
      <main>
        <div className="flex flex-wrap bg-white rounded-lg p-8">
          <form className="flex flex-row-reverse">
            <div>
              <div className="ml-10">
                <h1 className="text-2xl font-bold mb-6">Family Details :</h1>
                <div className="flex">
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Fathers Name :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Name"
                      defaultValue={familyDetails.fathersName}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Fathers Contact :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Name"
                      defaultValue={familyDetails.fathersPhoneNo}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Mothers Name :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.mothersName}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Mothers Contact :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Name"
                      defaultValue={familyDetails.mothersPhoneNo}
                      required
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Brothers Name:
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.brothersName}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Brothers Contact :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.brothersPhoneNo}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Sisters Name:
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.sistersName}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Sisters Contact :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.sistersPhoneNo}
                      required
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Fathers Occupation:
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.fathersOccupation}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Mothers Occupation:
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={familyDetails.mothersOccupation}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Fathers Income:
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={`₹ ${familyDetails.familyIncome} /-`}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="ml-10">
                <h1 className="text-2xl font-bold mb-6">Friends Details :</h1>
                <h1 className="text-lg font-semibold mb-5">
                  Non-College Friends
                </h1>
                <div className="flex">
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Name :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={friends.name}
                      required
                    />
                  </div>
                  <div className="flex flex-col pb-6 mr-8">
                    <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                      Contact :
                    </label>
                    <input
                      className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                      type="text"
                      placeholder="Enter your Brothers Name"
                      defaultValue={friends.contactNo}
                      required
                    />
                  </div>
                </div>
                <h1 className="text-lg font-semibold mb-5">College Friends</h1>
                <div className="flex">
                  {friends.collegeFriend.map((collegeFrnd) => (
                    <div>
                      <div className="flex flex-col pb-6 mr-8">
                        <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                          {collegeFrnd.name} :
                        </label>
                        <input
                          className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                          type="text"
                          placeholder="Enter your Brothers Name"
                          defaultValue={collegeFrnd.phoneNo}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-6">Personal Details :</h1>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Name :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-base border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Name"
                    defaultValue={student.name}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Phone.no :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 md:text-lg"
                    type="text"
                    placeholder="Enter your Roll.No"
                    //@ts-ignore
                    defaultValue={student.phoneNo}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Email :
                  </label>
                  <input
                    className="w-96 md:w-72 md:text-lg p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="email"
                    placeholder="Enter your Email"
                    defaultValue={student.email}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Age :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Age"
                    //@ts-ignore
                    defaultValue={student.age}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Gender :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Gender"
                    //@ts-ignore
                    defaultValue={student.gender}
                    required
                    disabled={student.gender ? true : false}
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Date Of Birth :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your  Date Of Birth"
                    defaultValue={moment(student.dateOfBirth).format(
                      "MMM Do YYYY"
                    )}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Date Of Addmission :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Date Of Addmission"
                    value={moment(student.admissionDate).format("MMM Do YYYY")}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Address :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Address"
                    //@ts-ignore
                    defaultValue={student.address}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Cast :
                  </label>
                  <input
                    className="w-36 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Cast"
                    //@ts-ignore
                    defaultValue={student.cast}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Religion :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg md:w-fit border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.religion}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Seat Type :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.seatType}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Addhar no :
                  </label>
                  <input
                    className=" w-46 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Addhar No"
                    //@ts-ignore
                    defaultValue={student.addharNumber}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    10th School :
                  </label>
                  <input
                    className=" w-46 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.tenthCollege}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    12th College :
                  </label>
                  <input
                    className=" w-56 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.twelthCollege}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Year of Passing (10th) :
                  </label>
                  <input
                    className=" w-44 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.tenthYOP}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Year of Passing (12th) :
                  </label>
                  <input
                    className=" w-44 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.twelthYOP}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Current Year :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.year}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Section :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.section}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Blood Type :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.bloodGroup}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Height :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.height}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 md:text-lg">
                    Weight :
                  </label>
                  <input
                    className=" w-20 p-2 pl-0 rounded-sm bg-white text-xl md:text-lg border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={`${student.weight} kg`}
                    required
                  />
                </div>
              </div>
              <div className="mt-2 mb-2 md:w-[50rem]">
                <Table
                  title="Academic Details :"
                  headings={[
                    "Year",
                    "10th",
                    "12th",
                    "Sem 1",
                    "Sem 2",
                    "Sem 3",
                    "Sem 4",
                    "Sem 5",
                    "Sem 6",
                    "Sem 7",
                    "Sem 8",
                  ]}
                  noShadow={true}
                >
                  <tr className="font-semibold">
                    <td className="pl-5 p-2 whitespace-nowrap">
                      <div>Score</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.tenthScore} %`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.twelthScore} %`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem1Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem2Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem3Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem4Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem5Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem6Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem7Score}`}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div>{`${student.sem8Score}`}</div>
                    </td>
                  </tr>
                </Table>
              </div>
              <div className="mt-2 mb-2 md:w-[50rem]">
                <Table
                  title="Attendance Today : "
                  headings={[
                    "date",
                    "lecture 1",
                    "lecture 2",
                    "lecture 3",
                    "lecture 4",
                    "lecture 5",
                    "lecture 6",
                  ]}
                  noShadow={true}
                >
                  {
                    //@ts-ignore
                    student.Attendance ? (
                      <tr className="font-semibold">
                        <td className="pl-5 p-2 whitespace-nowrap">
                          <div>
                            {
                              //@ts-ignore
                              moment(student.Attendance.updatedAt).format(
                                "MMM Do YYYY"
                              )
                            }
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture1
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture1
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture2
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture2
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture3
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture3
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture4
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture4
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture5
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture5
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture6
                              )}`}
                            >
                              {
                                //@ts-ignore
                                student.Attendance.lecture6
                              }
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="pl-5 p-2 whitespace-nowrap font-semibold">
                          Attendance is yet to be Marked
                        </td>
                      </tr>
                    )
                  }
                </Table>
              </div>
              <div>
                <input
                  className="mt-10 p-2 rounded-xl font-semibold text-md bg-purple-600 hover:bg-purple-700 cursor-pointer text-white"
                  type="submit"
                  value="Save Changes"
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default SingleStudentPage;
