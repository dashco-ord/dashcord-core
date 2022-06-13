import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const getTg = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method == "GET") {
    const tg = await prisma.hod.findUnique({
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
