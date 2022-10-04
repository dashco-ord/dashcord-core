import InchargesLayout from "components/Layouts/InchargesLayout";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import { checkUserRoleAndRedirect } from "lib/checks";
import { UserRole } from "@prisma/client";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const incharge = await prisma.tgIncharge.findUnique({
    where: {
      //@ts-ignore
      id: session?.id,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {
    extra: { incharge: JSON.parse(JSON.stringify(incharge)) },
  });
}

const User = ({ incharge }: any) => {
  return (
    <InchargesLayout>
      <main>
        <div className='flex flex-wrap bg-white rounded-lg p-8'>
          <form className='flex flex-row-reverse'>
            <div>
              <div className='flex w-80 h-80 bg-slate-200  rounded-md ml-60'>
                <Image
                  //@ts-ignore
                  src={incharge?.pictureUrl}
                  width={350}
                  height={350}
                  alt={`${incharge.name}`}
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
                    defaultValue={incharge?.name}
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
                    defaultValue={incharge?.email}
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
                    defaultValue={incharge?.department}
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
                    defaultValue={incharge?.pictureUrl}
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
                    defaultValue={incharge?.bio}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </InchargesLayout>
  );
};

export default User;
