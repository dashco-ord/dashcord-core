import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const studentsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });

  if (req.method == "GET") {
    try {
      const students = await prisma.tg.findUnique({
        where: {
          //@ts-ignore
          id: session?.id,
        },
        include: {
          Student: {
            select: {
              id: true,
              name: true,
              rollNo: true,
              email: true,
              gender: true,
              department: true,
            },
          },
        },
      });
      if (!students) {
        res.status(404).end();
      }
      //@ts-ignore
      res.json(students.Student);
      res.status(200).end();
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default studentsRoute;
