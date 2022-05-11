import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const getTg = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (req.method == "GET") {
    const tg = await prisma.tgIncharge.findUnique({
      where: {
        //@ts-ignore
        id: session?.id,
      },
    });
    res.json(tg);
    res.status(200).end();
  }
};

export default getTg;
