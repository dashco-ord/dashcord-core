import { Tg } from "@prisma/client";
import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const getAttendenceRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method == "GET") {
    //Add a filter for today
    const date = new Date();
    const today = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    try {
      const session = await getSession({ req });
      const tg = await prisma.tg.findUnique({
        //@ts-ignore
        where: { id: session?.id },
        select: {
          Student: {
            select: {
              name: true,
              rollNo: true,
              Attendances: true,
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
      console.log(error);
      res.status(404).end();
    }
  }
  res.status(405).end();
};

export default getAttendenceRoute;
