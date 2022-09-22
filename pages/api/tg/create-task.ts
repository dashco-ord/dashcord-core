import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import { Status, Student } from "@prisma/client";

const createTaskRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { title, description, deadlineDate, deadlineTime, id } =
      await req.body;
    const session = await getSession({ req });
    const tgId = session?.id;
    const tg = await prisma.tg.findUnique({
      where: {
        //@ts-ignore
        id: tgId,
      },
      select: { Student: true },
    });
    //@ts-ignore
    console.log(tg?.Student);
    try {
      const newTask = await prisma.tasks.create({
        data: {
          title: title,
          description: description,
          deadlineDate: deadlineDate,
          deadlineTime: deadlineTime,
          taskStatus: Status.InProgress,
          //@ts-ignore
          createdBy: tgId,
        },
      });
      //@ts-ignore
      tg.Student.map(async (student: Student) => {
        await prisma.tasks.update({
          where: { id: newTask.id },
          data: { Student: { connect: [{ rollNo: student.rollNo }] } },
        });
      });

      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
  res.status(405).end();
};

export default createTaskRoute;
