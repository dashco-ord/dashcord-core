import { UserRole } from "@prisma/client";
import HodsLayout from "components/Layouts/HodsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

const Reports = () => {
  return (
    <HodsLayout>
      <div>Reoprts</div>
    </HodsLayout>
  );
};

export default Reports;

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.HOD, {});
};
