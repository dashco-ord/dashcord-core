import Layout from "components/Layout/TgLayout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import validateUser from "lib/validateUser";
import { useEffect } from "react";

const InchargeHome = () => {
  const { data: session } = useSession();

  useEffect(() => {
    validateUser(session?.role);
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <div className='flex items-center justify-center h-4/5'>
          <h1 className='text-2xl font-semibold text-white'>
            Please Login first !!!
          </h1>
        </div>
      </Layout>
    );
  }

  if (session.role == UserRole.INCHARGE) {
    return (
      <Layout>
        <div className=' flex '>
          <Card title='Students' link={`/INCHARGE/students`} value={200} />
          <Card title='TGs' link={`/INCHARGE/tgs`} value={11}/>
        </div>
      </Layout>
    );
  }
};

export default InchargeHome;
