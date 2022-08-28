import { NextPage } from "next";
import Card from "components/Cards/Card";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";
import { UserRole } from "@prisma/client";

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {});
};

const HomePage: NextPage = ({ user }: any) => {
  return (
    <StudentsLayout>
      <div className="h-screen">
        <h1 className="font-semibold text-lg mb-4">Welcome, {user.name}!</h1>
        <div className="flex overflow-x-scroll ">
          <div className="shrink-0">
            <Card value={"100 %"} title="Attendance" />
          </div>
          <div className="shrink-0">
            <Card value={10} title="Tasks" />
          </div>
          <div className="shrink-0">
            <Card value={10} title="Goals" />
          </div>
        </div>
      </div>
    </StudentsLayout>
  );
};

export default HomePage;
