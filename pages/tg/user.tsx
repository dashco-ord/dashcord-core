import Layout from "components/Layout/TgLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tg } from "@prisma/client";

const User = () => {
  const [user, setUser] = useState<Tg>();

  const fetchUSer = async () => {
    const res = await axios.get("/api/tg");
    setUser(res.data);
  };

  useEffect(() => {
    fetchUSer();
  }, []);

  return (
    <Layout>
      <div className='text-white'>{user?.id}</div>
      <div className='text-white'>{user?.name}</div>
      <div className='text-white'>{user?.email}</div>
    </Layout>
  );
};

export default User;
