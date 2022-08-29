import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, UserRole } from "@prisma/client";
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

const createTg = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (req.method == "POST") {
    const { name, phoneNo, email, department, gender } = await req.body;
    try {
      if (session?.role == UserRole.INCHARGE) {
        const tg = await prisma.tg.create({
          data: {
            name: name,
            phoneNo: phoneNo,
            email: email,
            department: department,
            gender: gender,
            role: UserRole.TG,
            passHash: await bcrypt.hash("password123", 10),
          },
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

export default createTg;
