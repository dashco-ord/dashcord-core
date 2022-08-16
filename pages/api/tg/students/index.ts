import { PrismaClient, UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const studentsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });

  if (req.method == "GET") {
    if (session?.role == UserRole.TG) {
      try {
        const students = await prisma.tg.findUnique({
          where: {
            //@ts-ignore
            id: session?.id,
          },
          include: {
            Student: true,
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
  }
};

export default studentsRoute;
