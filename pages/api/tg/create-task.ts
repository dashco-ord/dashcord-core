import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";
import { Status } from "@prisma/client";

const createTaskRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { title, description, deadlineDate, deadlineTime, id } =
      await req.body;
    const session = await getSession({ req });
    const tgId = session?.id;
    try {
      await prisma.tasks.create({
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
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
  res.status(405).end();
};

export default createTaskRoute;
