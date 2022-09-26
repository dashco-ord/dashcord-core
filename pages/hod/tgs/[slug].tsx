import { Student, Tg, UserRole } from "@prisma/client";
import { prisma } from "lib/prisma";
import Link from "next/link";
import HodsLayout from "components/Layouts/HodsLayout";
import { checkUserRoleAndRedirect } from "lib/checks";

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const rawTG = await prisma.tg.findUnique({
    where: {
      id: params.slug,
    },
    include: {
      Student: true,
    },
  });
  return checkUserRoleAndRedirect(context, UserRole.HOD, {
    extra: {
      tg: JSON.parse(JSON.stringify(rawTG)),
      students: JSON.parse(JSON.stringify(rawTG?.Student)),
    },
  });

  // return {
  //   props: {
  //     tg: JSON.parse(JSON.stringify(rawTG)),
  //     students: JSON.parse(JSON.stringify(rawTG?.Student)),
  //   },
  // };
};

const SingleTgPage = ({ tg, students }: TgPageProps) => {
  return (
    <HodsLayout>
      <main>
        <div className="flex flex-wrap bg-white rounded-lg p-8">
          <div className="flex flex-row-reverse">
            <div>
              <div className="flex w-80 h-80 bg-slate-200  rounded-md ml-60">
                <img
                  //@ts-ignore
                  src={tg?.pictureUrl}
                  width={350}
                  height={350}
                />
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2">
                    Name :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Name"
                    defaultValue={
                      tg.gender == "Male"
                        ? `Mr. ${tg?.name}`
                        : `Ms. ${tg?.name}`
                    }
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2">
                    Phone.no :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Roll.No"
                    //@ts-ignore
                    defaultValue={tg?.phoneNo}
                    required
                  />
                </div>
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2">
                    Email :
                  </label>
                  <input
                    className="w-96 p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="email"
                    placeholder="Enter your Email"
                    defaultValue={tg?.email}
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2">
                    Department :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Department"
                    //@ts-ignore
                    defaultValue={tg?.department}
                    required
                  />
                </div>

                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2">
                    Gender :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Gender"
                    //@ts-ignore
                    defaultValue={tg?.gender}
                    required
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col pb-6 mr-8">
                  <label className="text-2xl font-semibold mr-5 pb-2 w-fit">
                    Bio :
                  </label>
                  <input
                    className="p-2 pl-0 rounded-sm bg-white text-xl border-b-2 border-b-gray-500 focus:outline-none focus:border-blue-500 transition ease-in-out delay-75 duration-75"
                    type="text"
                    placeholder="Enter your Bio"
                    //@ts-ignore
                    defaultValue={tg?.bio}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold mb-5 mr-4">Students</h1>
            <span className="text-4xl font-bold mb-5 mr-4">
              {students.length} :{" "}
            </span>
          </div>
          <ul className="flex flex-row">
            {" "}
            {students &&
              students.map((student) => (
                <li
                  key={student.rollNo}
                  className="text-xl font-semibold mr-4 border border-black w-fit p-3 rounded-md"
                >
                  <Link href={`/hod/students/${student.rollNo}`}>
                    <a className="hover:text-purple-700">{student.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </HodsLayout>
  );
};

export default SingleTgPage;

type TgPageProps = {
  tg: Tg;
  students: Student[];
};
