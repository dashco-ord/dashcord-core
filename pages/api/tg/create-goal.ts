import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

const createGoalRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { title, description, deadline, goalType, id } = await req.body;
    try {
      await prisma.goals.create({
        data: {
          title: title,
          deadline: deadline,
          description: description,
          type: goalType,
          studentId: id,
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

export default createGoalRoute;
