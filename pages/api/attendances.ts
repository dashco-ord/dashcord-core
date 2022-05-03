import { METHODS } from "http";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const getAttendenceRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method == "GET") {
    try {
      const session = await getSession({ req });
      const tg = await prisma.tg.findUnique({
        //@ts-ignore
        where: { id: session?.id },
        select: {
          Student: {
            select: {
              id: true,
            },
          },
        },
      });
      const studentIds: any[] = [];
      //@ts-ignore
      tg.Student.map((student) => studentIds.push(student.id));

      const findAttendance = async (studentId: string) => {
        const attendance = await prisma.attendance.findFirst({
          where: { studentId: studentId },
        });
        return attendance;
      };
      const attendances: any[] = studentIds.map((studentId) => {
        findAttendance(studentId);
      });
      console.log(attendances);

      console.log(attendances);
      res.status(200).end();
      return;
    } catch (error) {
      console.log(error);
      res.status(404).end();
    }
  }
  res.status(405).end();
};

export default getAttendenceRoute;
