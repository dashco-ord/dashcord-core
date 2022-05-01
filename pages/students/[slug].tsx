import { useState, useEffect } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { Student } from "@prisma/client";
import Toast, { ToastParams } from "components/Toast";

const SingleStudentPage = () => {
  const router = useRouter();
  const id = router.query.slug;
  const [student, setStudent] = useState<Student>();
  const [toast, setToast] = useState<ToastParams>();

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`/api/students/${id}`);
      setStudent(res.data);
    } catch (error) {
      setToast({
        type: "error",
        message: "There was an error while fetching the student",
      });
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

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
      <div className='text-white list-none'>
        <li>{student?.id}</li>
        <li>{student?.name}</li>
      </div>
    </Layout>
  );
};

export default SingleStudentPage;
