import { UserRole } from "@prisma/client";
import StudentsLayout from "components/Layouts/StudentsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.STUDENT, {});
};

const SettingsPage = () => {
  return <StudentsLayout></StudentsLayout>;
};

export default SettingsPage;
