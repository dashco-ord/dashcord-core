import Layout from "components/Layout/TgLayout";
import validateUser from "lib/validateUser";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    validateUser(session?.role);
  }, [session]);

  return (
    <Layout>
      <h1>Please Login</h1>
    </Layout>
  );
};

export default HomePage;
