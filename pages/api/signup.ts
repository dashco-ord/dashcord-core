import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { Student, UserRole } from "@prisma/client";
import { hashPassword } from "lib/passHash";
import { type } from "os";

const signUpRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  var newStudent;
  var newRollNo;
  if (req.method == "POST") {
    const { type } = await req.body;
    switch (type) {
      case "signup":
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
              role: UserRole.STUDENT,
            },
          });
          newRollNo = newStudent.rollNo;
          res.status(200).end();
        } catch (error) {
          console.log(error);
          res.status(500).end();
        }
        break;

      case "personalDetails":
        const {
          age,
          gender,
          dob,
          doa,
          address,
          cast,
          religion,
          seatType,
          addharNo,
          currentYear,
          section,
          bloodType,
          height,
          weight,
        } = await req.body;

        try {
          await prisma.student.update({
            where: {
              rollNo: newRollNo,
            },
            data: {
              age: parseInt(age),
              gender: gender,
              dateOfBirth: dob,
              admissionDate: doa,
              address: address,
              cast: cast,
              religion: religion,
              seatType: seatType,
              addharNumber: addharNo,
              year: parseInt(currentYear),
              section: section,
              bloodGroup: bloodType,
              height: height,
              weight: weight,
            },
          });
          res.status(200).end();
        } catch (error) {
          console.log(error);
          res.status(500).end();
        }
        break;
    }
    res.status(405).end();
  }
};

export default signUpRoute;
