import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { getSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session?.role === UserRole.TNP) {
    const { id } = await req.body;

    try {
      await prisma.experience.delete({
        where: { id: id },
      });
      res.status(200).end();
      return;
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }

  res.status(405).end();
  return;
}
