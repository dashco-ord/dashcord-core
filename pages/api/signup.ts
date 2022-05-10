import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 15);
};

const SignUpRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { name, contact, email, password } = await req.body;
    try {
      await prisma.student.create({
        data: {
          name: name,
          email: email,
          passHash: await hashPassword(password),
          phoneNo: contact,
        },
      });
      res.status(200).end();
    } catch (error) {
      res.status(500).end();
    }
    res.status(200).end();
  }
  res.status(405).end();
};

export default SignUpRoute;
