import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";
import { teacherGuardians, hods, students, tgIncharge } from "./data";

const main = async () => {
  try {
    console.log("\n Deleting existing Data... \n");
    await prisma.tg.deleteMany();
    await prisma.hod.deleteMany();
    await prisma.tgIncharge.deleteMany();
    await prisma.student.deleteMany();
    await prisma.familyDetails.deleteMany();

    console.log("Creating new data \n");

    console.log("Createing HOD's");
    await prisma.hod.createMany({ data: hods });

    console.log("Createing Tg Incharge");
    await prisma.tgIncharge.create({ data: tgIncharge });

    console.log("Createing TG's");
    await prisma.tg.createMany({ data: teacherGuardians });

    console.log("Createing students");
    students.map(async (student) => {
      await prisma.student.create({ data: student });
      await prisma.attendance.create({ data: { rollNo: student.rollNo } });
    });

    console.log("Creating Family Details");
    for (let i = 0; i < students.length; i++) {
      const email = faker.internet.email();
      await prisma.familyDetails.create({
        data: {
          email: email,
          passHash: email,
          fathersName: faker.name.findName("", "", "male"),
          mothersName: faker.name.findName("", "", "female"),
          brothersName: faker.name.findName("", "", "male"),
          sistersName: faker.name.findName("", "", "female"),
          fathersOccupation: faker.company.companyName(),
          mothersOccupation: "HouseWife",
          fathersPhoneNo: faker.phone.number(),
          mothersPhoneNo: faker.phone.number(),
          brothersPhoneNo: faker.phone.number(),
          sistersPhoneNo: faker.phone.number(),
          noOfSiblings: 2,
          familyIncome: faker.datatype.number({ min: 30000 }),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

main();
