import { UserRole } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {});
};

const TasksPage = () => {
  return <StudentsLayout></StudentsLayout>;
};

export default TasksPage;
