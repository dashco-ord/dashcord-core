import { NextPage } from "next";
import Card from "components/Cards/Card";
import TgsLayout from "components/Layouts/TgsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { Attendance, UserRole } from "@prisma/client";
import { useState, useEffect } from "react";
import { ToastParams } from "components/Toast";
import axios from "axios";
import Toast from "components/Toast";
import attendanceColors from "components/AttendanceColor";
import Table from "components/Tables/Table";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.TG, {});
};

type attendanceProps = {
  id: String;
  name: String;
  rollNo: String;
  Attendance: Attendance;
};

const HomePage: NextPage = ({ user }: any) => {
  const [attendances, setAttendances] = useState<attendanceProps[]>([]);
  const [toast, setToast] = useState<ToastParams>();

  const getAttendance = async () => {
    try {
      const res = await axios.get("/api/tg/attendances");
      setAttendances(res.data);
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while fetching the Attendance",
      });
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <TgsLayout>
      <div>
        {toast && (
          <Toast
            type={toast.type}
            className="mb-5"
            open={true}
            setOpen={() => setToast(undefined)}
          >
            {toast.message}
          </Toast>
        )}
      </div>
      <div className="h-screen">
        <h1 className="font-semibold text-lg mb-4">Welcome, {user.name}!</h1>
        <div className="flex overflow-x-scroll ">
          <div className="shrink-0">
            <Card title="All Students" value={attendances.length} />
          </div>
          <div className="shrink-0">
            <Card
              title="Weak Students"
              value={
                //@ts-ignore
                parseInt(attendances.length / 3)
              }
            />
          </div>
          <div className="shrink-0">
            <Card
              title="Avg. Students"
              value={
                //@ts-ignore
                parseInt(attendances.length / 3)
              }
            />
          </div>
        </div>

        <div className="pt-11">
          <Table
            refresh={getAttendance}
            title="Attendance per Lecture"
            headings={[
              "name",
              "rollNo",
              "lecture1",
              "lecture2",
              "lecture3",
              "lecture4",
              "lecture5",
              "lecture6",
            ]}
          >
            {attendances.map((attendance) =>
              attendance.Attendance ? (
                <tr key={attendance.Attendance.id}>
                  <td className="pl-5 p-2 whitespace-nowrap text-violet-500">
                    <Link href={`TG/students/${attendance.id}`}>
                      <a>{attendance.name}</a>
                    </Link>
                  </td>
                  <td className="p-2 whitespace-nowrap">{attendance.rollNo}</td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture1
                        )}`}
                      >
                        {attendance.Attendance.lecture1}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture2
                        )}`}
                      >
                        {attendance.Attendance.lecture2}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture3
                        )}`}
                      >
                        {attendance.Attendance.lecture3}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture4
                        )}`}
                      >
                        {attendance.Attendance.lecture4}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture5
                        )}`}
                      >
                        {attendance.Attendance.lecture5}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                          attendance.Attendance.lecture6
                        )}`}
                      >
                        {attendance.Attendance.lecture6}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                //@ts-ignore
                <tr key={attendance.name}>
                  <td className="pl-5 p-2 whitespace-nowrap text-violet-500">
                    <Link href={`/TG/students/${attendance.id}`}>
                      <a>{attendance.name}</a>
                    </Link>
                  </td>
                  <td className="p-2 whitespace-nowrap">{attendance.rollNo}</td>
                </tr>
              )
            )}
          </Table>
          {/* <Pagination /> */}
        </div>
      </div>
    </TgsLayout>
  );
};

export default HomePage;
