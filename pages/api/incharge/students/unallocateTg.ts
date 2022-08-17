import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { getSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

const unallocateTg = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method == "POST") {
    if (session?.role == UserRole.INCHARGE) {
      const { rollNo } = await req.body;
      try {
        await prisma.student.update({
          where: { rollNo: rollNo },
          data: { tgId: null },
        });
        res.status(200).end();
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    }
  }
  res.status(405).end();
};

export default unallocateTg;
