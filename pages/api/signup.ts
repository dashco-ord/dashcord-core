import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 15);
};

const SignUpRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  var newStudent;
  if (req.method == "POST") {
    const { name, contact, email, password } = await req.body;
    try {
      newStudent = await prisma.student.create({
        data: {
          name: name,
          email: email,
          passHash: await hashPassword(password),
          phoneNo: contact,
          role: UserRole.STUDENT,
        },
      });
      res.status(200).end();
    } catch (error) {
      res.status(500).end();
    }
    res.status(200).end();
  }
  if (req.method == "PUT") {
    const { gender, dob, validity, address, religion, admission } =
      await req.body;
    try {
      await prisma.student.update({
        where: {
          id: newStudent?.id,
        },
        data: {
          address: address,
          gender: gender,
          dateOfBirth: dob,
          religion: religion,
          admissionDate: admission,
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
    }
  }
  res.status(405).end();
};

export default SignUpRoute;
