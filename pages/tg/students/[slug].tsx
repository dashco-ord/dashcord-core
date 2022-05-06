import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import { Student } from "@prisma/client";

interface studentProps {
  student: Student;
}

export async function getStaticPaths() {
  const students = await prisma.student.findMany();
  const paths = students.map((student: any) => ({
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
  });
  return {
    props: {
      student: JSON.parse(JSON.stringify(rawStudent)),
    },
  };
}

const SingleStudentPage = ({ student }: studentProps) => {
  return (
    <Layout>
      <div className='text-white'>{student.id}</div>
      <div className='text-white'>{student.name}</div>
      <div className='text-white'>{student.gender}</div>
      <div className='text-white'>{student.age}</div>
      <div className='text-white'>{student.dateOfBirth}</div>
    </Layout>
  );
};

export default SingleStudentPage;
