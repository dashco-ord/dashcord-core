import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

export default async function createMeeting(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method == "POST") {
    const { title, description, studentId } = await req.body;
    try {
      await prisma.meetings.create({
        data: {
          title: title,
          description: description,
          //@ts-ignore
          createdBy: session?.id,
          studentId: studentId,
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }
}
