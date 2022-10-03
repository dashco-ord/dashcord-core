import InchargesLayout from "components/Layouts/InchargesLayout";
import { prisma } from "lib/prisma";
import { Student, Tg, UserRole } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { checkUserRoleAndRedirect } from "lib/checks";

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const rawStudent = await prisma.student.findUnique({
    where: {
      rollNo: params.slug,
    },
    include: {
      Attendances: true,
      Tg: true,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.INCHARGE, {
    extra: {
      student: JSON.parse(JSON.stringify(rawStudent)),
      tg: JSON.parse(JSON.stringify(rawStudent?.Tg)),
    },
  });
};

const SingleStudentPage = ({ student, tg }: studentProps) => {
  const [tgId, setTgId] = useState("");
  const router = useRouter();
  const handleTg = async (e: any) => {
    e.preventDefault();
    const data = {
      id: student.rollNo,
      newTgId: tgId,
    };
    try {
      const res = await axios.post("/api/incharge/students/updateTg", data);
      if (res.status == 200) {
        router.push("/incharge/students");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InchargesLayout>
      <main>
        <div className='flex flex-wrap bg-white rounded-lg p-8'>
          <form className='flex flex-row-reverse'>
            <div>
              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Name :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Name'
                    defaultValue={student.name}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Phone.no :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Roll.No'
                    //@ts-ignore
                    defaultValue={student.phoneNo}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Email :
                  </label>
                  <input
                    className='w-96 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='email'
                    placeholder='Enter your Email'
                    defaultValue={student.email}
                    required
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Age :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Age'
                    //@ts-ignore
                    defaultValue={student.age}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Gender :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Roll.No'
                    //@ts-ignore
                    defaultValue={student.gender}
                    required
                    disabled={true}
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Date Of Birth :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your  Date Of Birth'
                    value={moment(student.dateOfBirth).format("MMM Do YYYY")}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Date Of Addmission :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Date Of Addmission'
                    value={moment(student.admissionDate).format("MMM Do YYYY")}
                    required
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Address :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Address'
                    //@ts-ignore
                    defaultValue={student.address}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Cast :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Cast'
                    //@ts-ignore
                    defaultValue={student.cast}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Religion :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Religion'
                    //@ts-ignore
                    defaultValue={student.religion}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                    Seat Type :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-black'
                    type='text'
                    placeholder='Enter your Religion'
                    //@ts-ignore
                    defaultValue={student.seatType}
                    required
                  />
                </div>
              </div>
              <div className='mt-2 flex flex-wrap'>
                <form onSubmit={handleTg}>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                      Tg ID :
                    </label>
                    <input
                      className='w-fit p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75  text-black'
                      type='text'
                      placeholder='Enter Tg ID '
                      //@ts-ignore
                      defaultValue={tg?.id}
                      required
                      onChange={(e) => setTgId(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col pb-6 mr-8'>
                    <label className='text-2xl text-black font-semibold mr-5 pb-2'>
                      Tg Name :
                    </label>
                    <input
                      className='w-fit p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 text-black'
                      type='text'
                      placeholder='Enter your Religion'
                      //@ts-ignore
                      defaultValue={tg?.name}
                      required
                      readOnly={true}
                    />
                  </div>
                  <input
                    className='mt-10 p-2 rounded-xl font-semibold text-md text-white bg-purple-600 hover:bg-purple-700 cursor-pointer'
                    type='submit'
                    value='Save Changes'
                    onClick={handleTg}
                  />
                </form>
              </div>
            </div>
          </form>
        </div>
      </main>
    </InchargesLayout>
  );
};

export default SingleStudentPage;

type studentProps = {
  tg: Tg;
  student: Student;
};
