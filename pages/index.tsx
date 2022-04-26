import type { NextPage } from "next";
import Layout from "components/Layout";
import Card from "components/cards/Card";

const Home: NextPage = () => {
  return (
    <Layout>
      <Card title='All Students' value={20} />
    </Layout>
  );
};

export default Home;
