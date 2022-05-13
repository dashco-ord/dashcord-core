import { AttendanceType } from "@prisma/client";

const attendanceColors = (attendance: any) => {
  switch (attendance) {
    case AttendanceType.PRESENT:
      return "bg-green-500 text-white rounded-full text-center";
    case AttendanceType.ABSENT:
      return "bg-red-700 text-white rounded-full text-center";
    case AttendanceType.INFORMED:
      return "bg-purple-700 text-white rounded-full text-center";
    default:
      return "bg-gray-400 text-white rounded-full text-center";
  }
};

export default attendanceColors;
