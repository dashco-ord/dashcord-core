import type { NextPage } from "next";
import Layout from "components/Layout/TgLayout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Attendance, AttendanceType } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import validateUser from "lib/validateUser";
import Toast, { ToastParams } from "components/Toast";
import attendanceColors from "components/AttendanceColor";

type attendanceProps = {
  id: String;
  name: String;
  rollNo: String;
  Attendance: Attendance;
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [attendances, setAttendances] = useState<attendanceProps[]>([]);
  const [toast, setToast] = useState<ToastParams>();

  const getAttendance = async () => {
    try {
      const res = await axios.get("/api/attendances");
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
    validateUser(session?.role);
  }, [session]);

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
      <div>Student dashboard</div>
    </Layout>
  );
};

export default Home;
