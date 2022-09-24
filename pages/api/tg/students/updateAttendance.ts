import { AttendanceType, UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const updateAttendance = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method == "POST") {
    if (session?.role == UserRole.TG) {
      const { data, year, date } = await req.body;
      data.map(async (attendance: any) => {
        try {
          await prisma.attendance.create({
            data: {
              rollNo: attendance.rollNo,
              date: date,
              lecture1:
                attendance.lecture1 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture1 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture1 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
              lecture2:
                attendance.lecture2 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture2 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture2 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
              lecture3:
                attendance.lecture3 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture3 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture3 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
              lecture4:
                attendance.lecture4 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture4 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture4 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
              lecture5:
                attendance.lecture5 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture5 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture5 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
              lecture6:
                attendance.lecture6 == "present"
                  ? AttendanceType.PRESENT
                  : attendance.lecture6 == "absent"
                  ? AttendanceType.ABSENT
                  : attendance.lecture6 == "informed"
                  ? AttendanceType.INFORMED
                  : null,
            },
          });
          res.status(200).end();
        } catch (error) {
          console.log(error);
          res.status(500).end();
        }
      });
      res.status(200);
    }
    res.status(401);
  }
  res.status(405);
};

export default updateAttendance;
