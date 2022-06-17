import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import { Student, Tg } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import axios from "axios";

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
      Tg: true,
    },
  });
  return {
    props: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      tg: JSON.parse(JSON.stringify(rawStudent?.Tg)),
    },
  };
}

const SingleStudentPage = ({ student, tg }: studentProps) => {
  const [tgId, setTgId] = useState("");
  const handleTg = async (e: any) => {
    e.preventDefault();
    const data = {
      id: student.id,
      newTgId: tgId,
    };
    try {
      const res = await axios.post("/api/incharge/students/updateTg", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main>
        <div className="flex flex-wrap bg-white rounded-lg p-8">
          <form className="flex flex-row-reverse">
            <div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Name :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Name"
                    defaultValue={student.name}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Phone.no :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Roll.No"
                    //@ts-ignore
                    defaultValue={student.phoneNo}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Email :
                  </label>
                  <input
                    className="w-96 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="email"
                    placeholder="Enter your Email"
                    defaultValue={student.email}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Age :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Age"
                    //@ts-ignore
                    defaultValue={student.age}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Gender :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Roll.No"
                    //@ts-ignore
                    defaultValue={student.gender}
                    required
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Date Of Birth :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your  Date Of Birth"
                    value={moment(student.dateOfBirth).format("MMM Do YYYY")}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Date Of Addmission :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Date Of Addmission"
                    value={moment(student.admissionDate).format("MMM Do YYYY")}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Address :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Address"
                    //@ts-ignore
                    defaultValue={student.address}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Cast :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Cast"
                    //@ts-ignore
                    defaultValue={student.cast}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Religion :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.religion}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-black font-semibold mr-5 pb-2">
                    Seat Type :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black"
                    type="text"
                    placeholder="Enter your Religion"
                    //@ts-ignore
                    defaultValue={student.seatType}
                    required
                  />
                </div>
              </div>
            
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default SingleStudentPage;

type studentProps = {
  tg: Tg;
  student: Student;
};
