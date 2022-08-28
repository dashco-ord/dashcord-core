import { UserRole } from "@prisma/client";
import Card from "components/Cards/Card";
import HodsLayout from "components/Layouts/HodsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { prisma } from "lib/prisma";

export const getServerSideProps = async (context: any) => {
  const students = await prisma.student.count();
  const tgs = await prisma.tg.count();
  return checkUserRoleAndRedirect(context, UserRole.HOD, {
    extra: { students, tgs },
  });
};

const Homepage = ({ students, tgs }: any) => {
  return (
    <HodsLayout>
      <div className="flex overflow-x-scroll">
        <Card title="Students" value={students} link={"hod/students"} />
        <Card title="Tg's" value={tgs} link={"hod/tgs"} />
      </div>
    </HodsLayout>
  );
};

export default Homepage;
