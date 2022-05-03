import type { NextPage } from "next";
import Layout from "components/Layout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout>
      <div className=' flex '>
        <Card title='All Students' value={20} link={`/students`} />
        <Card title='Weak Students' value={20} />
        <Card title='Avg. Students' value={20} />
        <Card title='Good Students' value={20} />
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
};

export default Home;
