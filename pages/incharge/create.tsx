import axios from "axios";
import InchargesLayout from "components/Layouts/InchargesLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { checkUserRoleAndRedirect } from "lib/checks";
import { UserRole } from "@prisma/client";

export async function getServerSideProps(context: any) {
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {});
}

const CreateTG = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const data = {
      name,
      phoneNo: phone,
      email,
      department: department != "" ? department : null,
      gender: gender != "" ? gender : null,
    };
    try {
      const res = await axios.post("/api/incharge/createTg", data);
      if (res.status == 200) {
        router.push(`/incharge/tgs/${res.data.id}`);
      }
    } catch (error) {
      //handle error
    }
  };

  return (
    <InchargesLayout>
      <main>
        <div className='flex flex-wrap flex-col bg-white rounded-lg p-8'>
          <h1 className='text-4xl font-bold'>Create Tg</h1>
          <div className='mt-5'>
            <div className='flex'>
              <div className='flex flex-col pb-6 mr-4'>
                <label className='text-2xl font-semibold mr-3 pb-2'>
                  Name :
                </label>
                <input
                  className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  type='text'
                  placeholder='Enter your Name'
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col pb-6 mr-8'>
                <label className='text-2xl font-semibold mr-5 pb-2'>
                  Phone.no :
                </label>
                <input
                  className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  type='text'
                  placeholder='Enter your Phone No.'
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className='flex flex-col pb-6 mr-8'>
                <label className='text-2xl font-semibold mr-5 pb-2'>
                  Email :
                </label>
                <input
                  className='w-96 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  type='email'
                  placeholder='Enter your Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='flex'>
              <div className='flex flex-col pb-6 mr-8'>
                <label className='text-2xl font-semibold mr-5 pb-2'>
                  Department :
                </label>
                <select
                  name='Department'
                  className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  onChange={(e) => setDepartment(e.target.value)}
                  required>
                  <option value=''>Select Department</option>
                  <option value='CSE'>CSE</option>
                  <option value='ETC'>ETC</option>
                  <option value='EE'>EE</option>
                  <option value='ME'>ME</option>
                </select>
              </div>

              <div className='flex flex-col pb-6 mr-8'>
                <label className='text-2xl font-semibold mr-5 pb-2'>
                  Gender :
                </label>
                <select
                  name='Gender'
                  className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75'
                  onChange={(e) => setGender(e.target.value)}
                  required>
                  <option value=''>select gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
            </div>
          </div>
          <button
            className='mt-4 max-w-fit flex p-2 bg-blue-500 rounded-md text-white font-semibold items-center'
            onClick={() => handleCreate()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 pr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Create
          </button>
        </div>
      </main>
    </InchargesLayout>
  );
};

export default CreateTG;
