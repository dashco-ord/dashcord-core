import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 15);
};

const SignUpRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  if (req.method == "POST") {
    const { name, contact, email, password } = await req.body;
    try {
      await prisma.student.create({
        data: {
          name: name,
          email: email,
          passHash: await hashPassword(password),
          phoneNo: contact,
          address: "",
          admissionDate: "",
          age: 0,
          cast: "",
          dateOfBirth: "",
          department: "",
          gender: "",
          pictureUrl: "",
          religion: "",
          seatType: "",
          rollNo: "",
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
    res.status(200).end();
  }
  res.status(405).end();
};

export default SignUpRoute;
