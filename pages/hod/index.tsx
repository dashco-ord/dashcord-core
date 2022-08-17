import { UserRole } from "@prisma/client";
import HodsLayout from "components/Layouts/HodsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

const Homepage = () => {
  return (
    <HodsLayout>
      <div>HOD Homepage 🤌</div>
    </HodsLayout>
  );
};

export default Homepage;

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.HOD, {});
};
