import Layout from "components/Layout/TgLayout";
import { prisma } from "lib/prisma";
import { Attendance, Student, AttendanceType } from "@prisma/client";
import moment from "moment";
import Table from "components/Table/Table";
import attendanceColors from "components/AttendanceColor";
interface studentProps extends Student {
  student: Student;
}

// export async function getStaticPaths() {
//   const students = await prisma.student.findMany();
//   const paths = students.map((student) => ({
//     params: {
//       slug: student.id,
//     },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const rawStudent = await prisma.student.findUnique({
//     where: {
//       id: params.slug,
//     },
//     include: {
//       Attendance: true,
//     },
//   });
//   return {
//     props: {
//       student: JSON.parse(JSON.stringify(rawStudent)),
//     },
//   };
// }

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const rawStudent = await prisma.student.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      Attendance: true,
    },
  });
  return {
    props: {
      student: JSON.parse(JSON.stringify(rawStudent)),
    },
  };
};

const SingleStudentPage = ({ student }: studentProps) => {
  return (
    <Layout>
      <main>
        <div className='flex flex-wrap bg-[#1E1D1D] rounded-lg p-8'>
          <form className='flex flex-row-reverse'>
            <div>
              <div className='flex w-80 h-80 bg-slate-200 rounded-md ml-60'>
                <img
                  //@ts-ignore
                  src={student.pictureUrl}
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
                    defaultValue={student.name}
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
                    defaultValue={student.phoneNo}
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
                    defaultValue={student.email}
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
                    defaultValue={student.age}
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
                    placeholder='Enter your Roll.No'
                    //@ts-ignore
                    defaultValue={student.gender}
                    required
                    disabled={true}
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
                    value={moment(student.dateOfBirth).format("MMM Do YYYY")}
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
                    value={moment(student.admissionDate).format("MMM Do YYYY")}
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
                    defaultValue={student.address}
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
                    defaultValue={student.cast}
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
                    defaultValue={student.religion}
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
                    defaultValue={student.seatType}
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
                    student.Attendance ? (
                      <tr className='font-semibold'>
                        <td className='pl-5 p-2 whitespace-nowrap'>
                          <div>
                            {
                              //@ts-ignore
                              moment(student.Attendance.updatedAt).format(
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
                                student.Attendance.lecture1
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture1
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture2
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture2
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture3
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture3
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture4
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture4
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture5
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture5
                              }
                            </div>
                          </div>
                        </td>
                        <td className='p-2 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div
                              className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                                //@ts-ignore
                                student.Attendance.lecture6
                              )}`}>
                              {
                                //@ts-ignore
                                student.Attendance.lecture6
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

export default SingleStudentPage;
