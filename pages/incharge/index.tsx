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

  if (session.role == UserRole.incharge) {
    return (
      <Layout>
        <div className=' flex '>
          <Card title='All Students' link={`/students`} />
          <Card title='Weak Students' />
          <Card title='Avg. Students' />
          <Card title='Good Students' />
        </div>
        <div className='mt-10 flex'>
          <div className='mr-10'>
            <Table title='Achievements' headings={["Name", "Achievement"]}>
              <tr className='divide-black'>
                <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
                <td className='p-2 whitespace-nowrap'>won a hackathon</td>
              </tr>
              <tr className='divide-black'>
                <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
                <td className='p-2 whitespace-nowrap'>Won a hackathon</td>
              </tr>
            </Table>
          </div>
          <div>
            <Card title='Good Students' value={20} />
          </div>
        </div>
      </Layout>
    );
  }
};

export default InchargeHome;
