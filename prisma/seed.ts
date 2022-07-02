import { PrismaClient } from "@prisma/client";
import { teacherGuardians, hods, students } from "./data";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log("\n Deleting existing Data... \n");
    await prisma.tg.deleteMany();
    await prisma.hod.deleteMany();
    await prisma.student.deleteMany();
    await prisma.familyDetails.deleteMany();

    console.log("Creating new data \n");

    console.log("Createing HOD's");
    await prisma.hod.createMany({ data: hods });

    console.log("Createing TG's");
    try {
      await prisma.tg.createMany({ data: teacherGuardians });
    } catch (error) {
      console.log(error);
    }

    console.log("Createing students");
    await prisma.student.createMany({ data: students });

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
