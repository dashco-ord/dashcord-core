import type { NextPage } from "next";
import Layout from "components/Layout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";
import { useSession } from "next-auth/react";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Attendance } from "@prisma/client";
import axios from "axios";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  const getAttendance = async () => {
    const res = await axios.get("/api/attendances");
    setAttendances(res.data);
  };

  useEffect(() => {
    getAttendance();
  }, []);

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
        <Card title='All Students' value={20} link={`/students`} />
        <Card title='Weak Students' value={20} />
        <Card title='Avg. Students' value={20} />
        <Card title='Good Students' value={20} />
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
          {/* {attendances.map((attendance) => (
            <tr key={attendance.id}></tr>
          ))} */}
        </Table>
        {/* <Pagination /> */}
      </div>
    </Layout>
  );
};

export default Home;
