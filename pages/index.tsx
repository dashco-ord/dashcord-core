import type { NextPage } from "next";
import Layout from "components/Layout";
import Card from "components/cards/Card";
import Table from "components/Table/Table";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className=' flex justify-evenly'>
        <Card title='All Students' value={20} />
        <Card title='Weak Students' value={20} />
        <Card title='Avg. Students' value={20} />
        <Card title='Good Students' value={20} />
        <Table title='Achievements' headings={["Name", "Achievement"]}>
          <tr className='divide-black'>
            <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
            <td className='p-2 whitespace-nowrap'>Achievement</td>
          </tr>
          <tr className='divide-black'>
            <td className='pl-5 p-2 whitespace-nowrap'>Student Name</td>
            <td className='p-2 whitespace-nowrap'>Achievement</td>
          </tr>
        </Table>
      </div>
    </Layout>
  );
};

export default Home;
