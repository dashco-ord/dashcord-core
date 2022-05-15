import Layout from "components/Layout/TgLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Student } from "@prisma/client";
import moment from "moment";
import Table from "components/Table/Table";
import attendanceColors from "components/AttendanceColor";
import validateUser from "lib/validateUser";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<Student>();

  const fetchUSer = async () => {
    const res = await axios.get("/api/student");
    setUser(res.data);
  };

  useEffect(() => {
    fetchUSer();
    validateUser(session?.role);
  }, [session]);

  return (
    <Layout>
      <main>
        <div className='flex flex-wrap bg-[#1E1D1D] rounded-lg p-8'>
          <form className='flex flex-row-reverse'>
            <div>
              <div className='flex w-80 h-80 bg-black rounded-md ml-60'>
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
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Name :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Name'
                    defaultValue={user?.name}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Phone.no :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Roll.No'
                    //@ts-ignore
                    defaultValue={user?.phoneNo}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Email :
                  </label>
                  <input
                    className='w-96 p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='email'
                    placeholder='Enter your Email'
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Age :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Age'
                    //@ts-ignore
                    defaultValue={user?.age}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Gender :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Gender'
                    //@ts-ignore
                    defaultValue={user?.gender}
                    required
                    disabled={user?.gender ? true : false}
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Date Of Birth :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your  Date Of Birth'
                    defaultValue={moment(user?.dateOfBirth).format(
                      "MMM Do YYYY"
                    )}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Date Of Addmission :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Date Of Addmission'
                    value={moment(user?.admissionDate).format("MMM Do YYYY")}
                    required
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Address :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Address'
                    //@ts-ignore
                    defaultValue={user?.address}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Cast :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Cast'
                    //@ts-ignore
                    defaultValue={user?.cast}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Religion :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Religion'
                    //@ts-ignore
                    defaultValue={user?.religion}
                    required
                  />
                </div>
                <div className='flex flex-col pb-6 mr-8'>
                  <label className='text-2xl text-white font-semibold mr-5 pb-2'>
                    Seat Type :
                  </label>
                  <input
                    className='p-2 pl-0 rounded-sm bg-[#1E1D1D] text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75 caret-white text-white'
                    type='text'
                    placeholder='Enter your Religion'
                    //@ts-ignore
                    defaultValue={user?.seatType}
                    required
                  />
                </div>
              </div>
              <div className='mt-2 mb-2 shadow-md'>
                <Table
                  title='Attendance Today : '
                  headings={[
                    "date",
                    "lecture 1",
                    "lecture 2",
                    "lecture 3",
                    "lecture 4",
                    "lecture 5",
                    "lecture 6",
                  ]}>
                  {
                    //@ts-ignore
                    user?.Attendance ? (
                      <tr className='font-semibold'>
                        <td className='pl-5 p-2 whitespace-nowrap'>
                          <div>
                            {
                              //@ts-ignore
                              moment(user?.Attendance.updatedAt).format(
                                "MMM Do YYYY"
                              )
                            }
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture1
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture1
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture2
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture2
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture3
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture3
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture4
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture4
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture5
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture5
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                user?.Attendance.lecture6
                              )}`}>
                              {
                                //@ts-ignore
                                user?.Attendance.lecture6
                              }
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className='pl-5 p-2 whitespace-nowrap font-semibold'>
                          Attendance is yet to be Marked
                        </td>
                      </tr>
                    )
                  }
                </Table>
              </div>
              <div>
                <input
                  className='mt-10 p-2 rounded-xl font-semibold text-md text-white bg-purple-600 hover:bg-purple-700 cursor-pointer'
                  type='submit'
                  value='Save Changes'
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default User;
