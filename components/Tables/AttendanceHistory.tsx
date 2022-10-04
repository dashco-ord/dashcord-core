import { Attendances } from "@prisma/client";
import moment from "moment";
import Table from "./Table";
import attendanceColors from "components/AttendanceColor";

type AttendanceHistoryProps = {
  attendances: Attendances[];
};

export default function AttendanceHistory({
  attendances,
}: AttendanceHistoryProps) {
  return (
    <div className='ml-10 mt-16 mb-2 md:w-[50rem] md:ml-0 md:mt-4'>
      <h2 className='font-bold text-2xl mt-7 mr-auto'>Past Attendances : </h2>
      <Table
        title=''
        headings={[
          "date",
          "lecture 1",
          "lecture 2",
          "lecture 3",
          "lecture 4",
          "lecture 5",
          "lecture 6",
        ]}
        noShadow={true}
        scroll={true}>
        {attendances.map((attendance) => (
          <tr className='font-semibold' key={attendance.id}>
            <td className='pl-5 p-2 whitespace-nowrap'>
              <div>{moment(attendance.date).format("MMM Do YYYY")}</div>
            </td>
            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture1
                  )}`}>
                  {attendance.lecture1}
                </div>
              </div>
            </td>

            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture2
                  )}`}>
                  {attendance.lecture2}
                </div>
              </div>
            </td>

            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture3
                  )}`}>
                  {attendance.lecture3}
                </div>
              </div>
            </td>

            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture4
                  )}`}>
                  {attendance.lecture4}
                </div>
              </div>
            </td>

            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture5
                  )}`}>
                  {attendance.lecture5}
                </div>
              </div>
            </td>

            <td className='p-2 whitespace-nowrap'>
              <div className='flex items-center'>
                <div
                  className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                    attendance.lecture6
                  )}`}>
                  {attendance.lecture6}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
