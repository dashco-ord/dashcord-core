import Layout from "components/Layout/TgLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tg } from "@prisma/client";

const User = () => {
  const [user, setUser] = useState<Tg>();

  const fetchUSer = async () => {
    const res = await axios.get("/api/incharge");
    setUser(res.data);
  };

  useEffect(() => {
    fetchUSer();
  }, []);

  return (
    <Layout>
      <main>
        <div className='flex flex-wrap bg-white rounded-lg p-8'>
          <form className='flex flex-row-reverse'>
            <div>
              <div className='flex w-80 h-80 bg-slate-200  rounded-md ml-60'>
                <img
                  //@ts-ignore
                  src={user?.pictureUrl}
                  width={350}
                  height={350}
                />
              </div>
            </div>
            <div>
              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2'>
                    Name :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                    type='text'
                    placeholder='Enter your Name'
                    defaultValue={user?.name}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2'>
                    Email :
                  </label>
                  <input
                    className='w-96 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 '
                    type='email'
                    placeholder='Enter your Email'
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2'>
                    Department :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 '
                    type='text'
                    placeholder='Enter your Department'
                    //@ts-ignore
                    defaultValue={user?.department}
                    required
                  />
                </div>

                <div className='flex flex-col pb-6 mr-8 w-fit'>
                  <label className='text-2xl font-semibold mr-5 pb-2'>
                    Picture url :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 '
                    type='text'
                    placeholder='Enter your Picture Url'
                    //@ts-ignore
                    defaultValue={user?.pictureUrl}
                    required
                  />
                </div>
              </div>
              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl font-semibold mr-5 pb-2 w-fit'>
                    Bio :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 '
                    type='text'
                    placeholder='Enter your Bio'
                    //@ts-ignore
                    defaultValue={user?.bio}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default User;
