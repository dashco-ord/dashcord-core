import { prisma } from "../lib/prisma";
import faker from "@faker-js/faker";
import { teacherGuardians, hods, students } from "./data";

const main = async () => {
  console.log("\n Deleting existing Data... \n");
  await prisma.tg.deleteMany();
  await prisma.hod.deleteMany();
  await prisma.student.deleteMany();
  await prisma.familyDetails.deleteMany();

  console.log("Creating new data \n");

  console.log("Createing HOD's");
  await prisma.hod.createMany({ data: hods });

  console.log("Createing TG's");
  await prisma.tg.createMany({ data: teacherGuardians });

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
        fathersPhoneNo: faker.phone.phoneNumber(),
        mothersPhoneNo: faker.phone.phoneNumber(),
        brothersPhoneNo: faker.phone.phoneNumber(),
        sistersPhoneNo: faker.phone.phoneNumber(),
        noOfSiblings: 2,
        familyIncome: faker.datatype.number({ min: 30000 }),
      },
    });
  }
};

main();
