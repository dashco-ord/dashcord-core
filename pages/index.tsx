import Layout from "components/Layout/TgLayout";
import validateUser from "lib/validateUser";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();
  validateUser(session?.role);
  return <Layout></Layout>;
};

export default HomePage;
