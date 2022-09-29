import { Attendances } from "@prisma/client";

type AttendanceHistoryProps = {
  attendances: Attendances[];
};

export default function AttendanceHistory({
  attendances,
}: AttendanceHistoryProps) {
  return <div>{JSON.stringify(attendances)}</div>;
}
