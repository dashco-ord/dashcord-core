import type { NextPage } from "next";
import Layout from "components/Layout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Attendance, AttendanceType } from "@prisma/client";
import axios from "axios";
import Link from "next/link";

type attendanceProps = {
  id: String;
  name: String;
  rollNo: String;
  Attendance: Attendance;
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [attendances, setAttendances] = useState<attendanceProps[]>([]);

  const getAttendance = async () => {
    const res = await axios.get("/api/attendances");
    setAttendances(res.data);
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const attendanceColors = (attendance: any) => {
    switch (attendance) {
      case AttendanceType.Present:
        return "bg-green-500 text-white rounded-full text-center";
      case AttendanceType.Absent:
        return "bg-red-700 text-white rounded-full text-center";
      case AttendanceType.Informed:
        return "bg-purple-700 text-white rounded-full text-center";
      default:
        return "bg-gray-400 text-white rounded-full text-center";
    }
  };

  if (!session) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-4/5'>
          <h1 className='text-2xl font-semibold text-white'>
            Please Login first !!!
          </h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className=' flex '>
        <Card
          title='All Students'
          value={attendances.length}
          link={`/students`}
        />
        <Card title='Weak Students' value={attendances.length / 3} />
        <Card title='Avg. Students' value={attendances.length / 3} />
        <Card title='Good Students' value={attendances.length} />
      </div>
      <div className='mt-10 flex'>
        <div className='mr-10'>
          <Table title='Achievements' headings={["Name", "Achievement"]}>
            <tr className='divide-black'>
              <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
              <td className='p-2 whitespace-nowrap'>won a hackathon</td>
            </tr>
            <tr className='divide-black'>
              <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
              <td className='p-2 whitespace-nowrap'>Won a hackathon</td>
            </tr>
          </Table>
        </div>
        <div>
          <Card title='Good Students' value={20} />
        </div>
      </div>
      <div className='pt-11'>
        <Table
          refresh={getAttendance}
          title='Attendance per Lecture'
          headings={[
            "name",
            "rollNo",
            "lecture1",
            "lecture2",
            "lecture3",
            "lecture4",
            "lecture5",
            "lecture6",
          ]}>
          {attendances.map((attendance) =>
            attendance.Attendance ? (
              <tr key={attendance.Attendance.id}>
                <td className='pl-5 p-2 whitespace-nowrap text-violet-500'>
                  {attendance.Attendance && (
                    <Link href={`/students/${attendance.id}`}>
                      <a>{attendance.name}</a>
                    </Link>
                  )}
                </td>
                <td className='p-2 whitespace-nowrap'>{attendance.rollNo}</td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture1
                      )}`}>
                      {attendance.Attendance.lecture1}
                    </div>
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture2
                      )}`}>
                      {attendance.Attendance.lecture2}
                    </div>
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture3
                      )}`}>
                      {attendance.Attendance.lecture3}
                    </div>
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture4
                      )}`}>
                      {attendance.Attendance.lecture4}
                    </div>
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture5
                      )}`}>
                      {attendance.Attendance.lecture5}
                    </div>
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                        attendance.Attendance.lecture6
                      )}`}>
                      {attendance.Attendance.lecture6}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              //@ts-ignore
              <tr key={attendance.name}>
                <td className='pl-5 p-2 whitespace-nowrap text-violet-500'>
                  <Link href={`/students/${attendance.id}`}>
                    <a>{attendance.name}</a>
                  </Link>
                </td>
                <td className='p-2 whitespace-nowrap'>{attendance.rollNo}</td>
              </tr>
            )
          )}
        </Table>
        {/* <Pagination /> */}
      </div>
    </Layout>
  );
};

export default Home;
