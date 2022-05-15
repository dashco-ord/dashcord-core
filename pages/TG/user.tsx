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
      <main>
        <div className="flex flex-wrap bg-[#1E1D1D] rounded-lg p-8">
          <form className="flex flex-row-reverse">
            <div>
              <div className="flex w-80 h-80 bg-black rounded-md ml-60">
                <img
                  //@ts-ignore
                  src={user?.pictureUrl}
                  width={350}
                  height={350}
                />
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2">
                    Name :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="text"
                    placeholder="Enter your Name"
                    defaultValue={user?.name}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2">
                    Phone.no :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="text"
                    placeholder="Enter your Roll.No"
                    //@ts-ignore
                    defaultValue={user?.phoneNo}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2">
                    Email :
                  </label>
                  <input
                    className="w-96 p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="email"
                    placeholder="Enter your Email"
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2">
                    Department :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="text"
                    placeholder="Enter your Department"
                    //@ts-ignore
                    defaultValue={user?.department}
                    required
                  />
                </div>

                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2">
                    Gender :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="text"
                    placeholder="Enter your Gender"
                    //@ts-ignore
                    defaultValue={user?.gender}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl text-white font-semibold mr-5 pb-2 w-fit">
                    Bio :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white"
                    type="text"
                    placeholder="Enter your Bio"
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
