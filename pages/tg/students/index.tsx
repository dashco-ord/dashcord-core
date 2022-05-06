import Layout from "components/Layout/TgLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "@prisma/client";
import Table from "components/Table/Table";
import Pagination from "components/Pagination";
import Card from "components/cards/Card";
import Toast, { ToastParams } from "components/Toast";
import FilterItem from "components/FilterItem";
import Link from "next/link";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    totalMale: 0,
    totalFemale: 0,
  });
  const [toast, setToast] = useState<ToastParams>();
  const [selectedGenderFilter, setSelectedGenderFilter] = useState("all");

  const fetchStudents = async ({ page } = { page: 1 }) => {
    const fetchStats = page == 1;
    try {
      const res = await axios.get("/api/students", {
        params: {
          page,
          stats: fetchStats,
          g: selectedGenderFilter,
        },
      });
      setPage(page);
      setStudents(res.data.students);
      if (fetchStats) {
        setStats(res.data.stats);
      }
    } catch (e) {
      setToast({
        type: "error",
        message: "There was an error while fetching the students",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedGenderFilter]);

  const handleNavigate = async (page: any) => {
    await fetchStudents({ page });
  };

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
        <Card title='All Students' value={stats.total} />
        <Card title='All Male Students' value={stats.totalMale} />
        <Card title='All Female Students' value={stats.totalFemale} />
      </div>

      <div className='sm:flex sm:justify-between sm:items-center mb-10'>
        {/* Left side */}
        <div className='mb-4 sm:mb-0'>
          <ul className='flex flex-wrap -m-1'>
            <FilterItem
              name={"all"}
              label='All'
              onSelect={setSelectedGenderFilter}
              selected={selectedGenderFilter == "all"}
            />
            <FilterItem
              name={"male"}
              label='Male'
              onSelect={setSelectedGenderFilter}
              selected={selectedGenderFilter == "male"}
            />
            <FilterItem
              name={"female"}
              label='Female'
              onSelect={setSelectedGenderFilter}
              selected={selectedGenderFilter == "female"}
            />
          </ul>
        </div>
      </div>

      <Table
        title='All Students'
        headings={["id", "name", "rollNo", "email", "gender", "department"]}>
        {students.map((student) => (
          <tr key={student.id}>
            <td className='pl-5 p-2 whitespace-nowrap text-violet-400'>
              <Link href={`/students/${student.id}`}>
                <a>{student.id}</a>
              </Link>
            </td>
            <td className='p-2 whitespace-nowrap'>{student.name}</td>
            <td className='p-2 whitespace-nowrap'>{student.rollNo}</td>
            <td className='p-2 whitespace-nowrap text-indigo-300'>
              <a href={`mailto:${student.email}`}>{student.email}</a>
            </td>
            <td
              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${genderColor(
                student.gender
              )}`}>
              {student.gender}
            </td>
            <td className='p-2 whitespace-nowrap'>{student.department}</td>
          </tr>
        ))}
      </Table>
      <Pagination
        currentPage={page}
        total={stats.total}
        onNavigation={handleNavigate}
      />
    </Layout>
  );
};

export default StudentsPage;
