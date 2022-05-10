import Layout from "components/Layout/TgLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "@prisma/client";
import Table from "components/Table/Table";
import Card from "components/cards/Card";
import Toast, { ToastParams } from "components/Toast";
import Link from "next/link";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const [toast, setToast] = useState<ToastParams>();

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/tg/students");

      setStudents(res.data);
    } catch (e) {
      setToast({
        type: "error",
        message: "There was an error while fetching the students",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const genderColor = (gender: string) => {
    switch (gender) {
      case "male":
        return "text-white bg-purple-800";
      case "female":
        return "text-white bg-pink-800";
    }
  };

  return (
    <Layout>
      <div>
        {toast && (
          <Toast
            type={toast.type}
            className='mb-5'
            open={true}
            setOpen={() => setToast(undefined)}>
            {toast.message}
          </Toast>
        )}
      </div>

      <div className='flex mb-10'>
        <Card title='All Students' value={students.length} />
      </div>

      <Table
        title='All Students'
        headings={["id", "name", "rollNo", "email", "gender", "department"]}>
        {students.map((student) => (
          <tr key={student?.id}>
            <td className='pl-5 p-2 whitespace-nowrap text-violet-400'>
              <Link href={`/tg/students/${student?.id}`}>
                <a>{student?.id}</a>
              </Link>
            </td>
            <td className='p-2 whitespace-nowrap'>{student?.name}</td>
            <td className='p-2 whitespace-nowrap'>{student?.rollNo}</td>
            <td className='p-2 whitespace-nowrap text-indigo-300'>
              <a href={`mailto:${student?.email}`}>{student?.email}</a>
            </td>
            <td
              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${genderColor(
                //@ts-ignore
                student.gender
              )}`}>
              {student.gender}
            </td>
            <td className='p-2 whitespace-nowrap'>{student.department}</td>
          </tr>
        ))}
      </Table>
    </Layout>
  );
};

export default StudentsPage;
