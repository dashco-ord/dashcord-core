import { NextPage } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session?.user) {
    return {
      redirect: { destination: "/login" },
    };
  }
  return {
    props: {},
  };
};

const HomePage: NextPage = () => {
  return <div className="font-semibold text-xl">Home page</div>;
};

export default HomePage;
