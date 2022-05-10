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
              name: true,
              rollNo: true,
              Attendance: true,
            },
          },
        },
      });
      const attendances: any[] = [];
      //@ts-ignore
      tg.Student.map((attendance) => attendances.push(attendance));
      res.json(attendances);
      res.status(200).end();
      return;
    } catch (error) {
      res.status(404).end();
    }
  }
  res.status(405).end();
};

export default getAttendenceRoute;
