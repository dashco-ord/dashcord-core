import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

const deleteTaskRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = await req.query.id;
  if (req.method == "DELETE") {
    try {
      await prisma.tasks.delete({
        where: {
          //@ts-ignore
          id: id,
        },
      });
      res.status(200).end();
    } catch (error) {
      res.status(500).end();
    }
  }
};

export default deleteTaskRoute;
