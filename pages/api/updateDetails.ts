import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const updateDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const session = await getSession({ req });
    if (session) {
      const id = session.id;
      const type = await req.body.type;
      try {
      } catch (error) {
        res.status(500);
      }
    }
    console.log("non authenticated");
    res.send(401);
  }
  res.send(405);
};

export default updateDetails;
