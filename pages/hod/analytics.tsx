import { UserRole } from "@prisma/client";
import HodsLayout from "components/Layouts/HodsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

const AnalyticsPage = () => {
  return (
    <HodsLayout>
      <div className="bg-white min-h-[40rem] p-4">
        <div>
          <h1 className="text-xl font-bold mb-4">Class Wise Analysis : </h1>
          <div className="border border-black w-fit p-2 rounded-md">
            <div className="text-lg font-semibold">3rd Year</div>
            <div className="text-md">section B</div>
          </div>
        </div>
      </div>
    </HodsLayout>
  );
};

export default AnalyticsPage;

export const getServerSideProps = async (context: any) => {
  return checkUserRoleAndRedirect(context, UserRole.HOD, {});
};
