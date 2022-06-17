import { UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const maxLimit = 50;

const TgsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  //@ts-ignore
  const page = parseInt(req.query?.page ?? "1") ?? 1; // @ts-ignore
  const limit = parseInt(req.query?.limit ?? "11") ?? 11; // @ts-ignore
  const perPage = limit > maxLimit ? maxLimit : limit;
  const offset = (page - 1) * perPage;

  if (session?.role == UserRole.HOD||UserRole.INCHARGE) {
    const tgs = await prisma.tg.findMany({
      include: { Student: true },
      skip: offset,
      take: perPage,
    });
    const data = {
      tgs: tgs,
      total: tgs.length,
    };
    res.json(data);
    res.status(200).end();
  }
  res.status(405).end();
};

export default TgsRoute;
