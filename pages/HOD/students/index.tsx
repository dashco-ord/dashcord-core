import axios from "axios";
import { useEffect, useState } from "react";
import { Student } from "@prisma/client";
import Table from "components/Table/Table";
import Pagination from "components/Pagination";
import Card from "components/cards/Card";
import Toast, { ToastParams } from "components/Toast";
import NumericFilterItem from "components/FilterItem/NumericFilterItem";
import Link from "next/link";
import HodLayout from "components/Layout/HodLayout";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    totalMale: 0,
    totalFemale: 0,
  });
  const [toast, setToast] = useState<ToastParams>();
  const [selectedYearFilter, setSelectedYearFilter] = useState(0);

  const fetchStudents = async ({ page } = { page: 1 }) => {
    const fetchStats = page == 1;
    try {
      const res = await axios.get("/api/incharge/students", {
        params: {
          page,
          stats: fetchStats,
          y: selectedYearFilter,
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
  }, [selectedYearFilter]);

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
    <HodLayout>
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
            <NumericFilterItem
              name={"All"}
              label={0}
              onSelect={setSelectedYearFilter}
              selected={selectedYearFilter == 0}
            />
            <NumericFilterItem
              name={"2nd"}
              label={2}
              onSelect={setSelectedYearFilter}
              selected={selectedYearFilter == 2}
            />
            <NumericFilterItem
              name={"3rd"}
              label={3}
              onSelect={setSelectedYearFilter}
              selected={selectedYearFilter == 3}
            />
            <NumericFilterItem
              name={"4th"}
              label={4}
              onSelect={setSelectedYearFilter}
              selected={selectedYearFilter == 4}
            />
          </ul>
        </div>
      </div>

      <Table
        title='All Students'
        headings={[
          "name",
          "rollNo",
          "email",
          "gender",
          "department",
          "year",
          "section",
        ]}>
        {students.map((student) => (
          <tr key={student.id}>
            <td className='pl-5 p-2 whitespace-nowrap text-violet-400'>
              <Link href={`/HOD/students/${student.id}`}>
                <a>{student.name}</a>
              </Link>
            </td>
            <td className='p-2 whitespace-nowrap'>{student.rollNo}</td>
            <td className='p-2 whitespace-nowrap text-indigo-300'>
              <a href={`mailto:${student.email}`}>{student.email}</a>
            </td>
            <td
              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${genderColor(
                //@ts-ignore
                student?.gender
              )}`}>
              {student.gender}
            </td>
            <td className='p-2 whitespace-nowrap'>{student.department}</td>
            <td className='p-2 whitespace-nowrap'>{student.year}</td>
            <td className='p-2 whitespace-nowrap'>{student.section}</td>
          </tr>
        ))}
      </Table>
      <Pagination
        currentPage={page}
        total={stats.total}
        onNavigation={handleNavigate}
      />
    </HodLayout>
  );
};

export default StudentsPage;
