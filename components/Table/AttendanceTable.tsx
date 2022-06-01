import { Attendance } from "@prisma/client";
import Table from "./Table";
import attendanceColors from "components/AttendanceColor";
import moment from "moment";

const AttendanceTable = ({ attendance }: AttendanceTableProps) => {
  return (
    <div className='ml-10 mt-2 mb-2 md:w-[50rem]'>
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
        ]}
        noShadow={true}>
        {
          //@ts-ignore
          attendance ? (
            <tr className='font-semibold'>
              <td className='pl-5 p-2 whitespace-nowrap'>
                <div>
                  {
                    //@ts-ignore
                    moment(attendance.updatedAt).format("MMM Do YYYY")
                  }
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture1
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture1
                    }
                  </div>
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture2
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture2
                    }
                  </div>
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture3
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture3
                    }
                  </div>
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture4
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture4
                    }
                  </div>
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture5
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture5
                    }
                  </div>
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div
                    className={`mt-1.5 inline-flex font-medium rounded-full text-center px-2 py-0.3 ${attendanceColors(
                      //@ts-ignore
                      attendance.lecture6
                    )}`}>
                    {
                      //@ts-ignore
                      attendance.lecture6
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
  );
};

export default AttendanceTable;

type AttendanceTableProps = {
  attendance?: Attendance | null;
};
