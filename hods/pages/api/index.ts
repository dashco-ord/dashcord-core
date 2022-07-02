import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const getHod = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(session);
  if (req.method == "GET") {
    const hod = await prisma.hod.findUnique({
      where: {
        //@ts-ignore
        id: session?.id,
      },
    });
    res.json(hod);
    res.status(200).end();
  }
};

export default getHod;
