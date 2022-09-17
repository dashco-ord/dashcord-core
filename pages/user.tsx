import { Student, UserRole } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { getSession } from "next-auth/react";
import Details from "./details";
import { prisma } from "lib/prisma";
import PersonalDetailForm from "components/DataForms/PersonalDetail";

type UserProps = {
  student: Student;
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  const student = await prisma.student.findUnique({
    where: {
      //@ts-ignore
      rollNo: session?.id,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {
    extra: { student: JSON.parse(JSON.stringify(student)) },
  });
};

export default function UserPage({ student }: UserProps) {
  return (
    <StudentsLayout>
      {!student && <Details />}
      {student && <PersonalDetailForm student={student} />}
    </StudentsLayout>
  );
}
