import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Student, UserRole } from "@prisma/client";
import { hashPassword } from "lib/passHash";

const signUpRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  let newStudent: Student;
  if (req.method == "POST") {
    const { rollNo, name, contact, email, password } = await req.body;
    const passHash = await hashPassword(password);
    try {
      newStudent = await prisma.student.create({
        data: {
          rollNo: rollNo,
          name: name,
          phoneNo: contact,
          email: email,
          passHash: passHash,
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
  res.status(405).end();
};

export default signUpRoute;
