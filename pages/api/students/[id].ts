import { prisma } from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const SingleStudentRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id;
  if (req.method == "GET") {
    try {
      const student = await prisma.student.findUnique({
        where: {
          //@ts-ignore
          id: id,
        },
      });
      if (!student) {
        res.status(404).end();
      }
      res.json(student);
      res.status(200).end();
      return;
    } catch (error) {
      res.status(500).end();
    }
  }
  res.status(405).end();
};

export default SingleStudentRoute;
