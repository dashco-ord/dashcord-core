import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, UserRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

const deleteTg = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (req.method == "POST") {
    const { data } = await req.body;
    try {
      if (session?.role == UserRole.INCHARGE) {
        const tg = await prisma.tg.delete({
          where: { id: data },
        });
        res.send(tg);
        res.status(200).end();
      }
    } catch (error) {
      console.log(error);
    }
  }
  res.status(405).end();
};

export default deleteTg;
