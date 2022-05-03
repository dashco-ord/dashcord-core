import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 15);
};

const prisma = new PrismaClient();

const seed = async () => {
  console.log("🪓 Deleting existing Data..");
  await prisma.hod.deleteMany();
  await prisma.tgIncharge.deleteMany();
  await prisma.tg.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parents.deleteMany();
  await prisma.student.deleteMany();

  console.log("\n🐧 Starting seed...\n");

  console.log("Creating HOD...");
  const hodAttributes = [];
  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email().toLowerCase();
    hodAttributes.push({
      name: faker.name.findName(),
      email: email,
      passHash: await hashPassword(email),
      gender: faker.address.countryCode(),
      portfolio: faker.internet.url(),
      pictureUrl: faker.internet.url(),
      bio: faker.address.secondaryAddress(),
      department: faker.address.countryCode(),
      role: UserRole.hod,
    });
  }
  await prisma.hod.createMany({ data: hodAttributes });

  console.log("Creating TG Incharge's...");
  const tgInchargeAttributes = [];
  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email();
    tgInchargeAttributes.push({
      name: faker.name.findName(),
      email: email,
      passHash: await hashPassword(email),
      pictureUrl: faker.internet.url(),
      role: UserRole.incharge,
    });
  }
  await prisma.tgIncharge.createMany({ data: tgInchargeAttributes });

  console.log("Creating TG...");
  const tgAttributes = [];
  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email();
    let gender = "male";
    if (i % 2 == 0) {
      gender = "female";
    }
    tgAttributes.push({
      name: faker.name.findName(),
      email: email,
      passHash: await hashPassword(email),
      phoneNo: faker.phone.phoneNumber(),
      pictureUrl: faker.internet.url(),
      gender: gender,
      department: "CSE",
      role: UserRole.tg,
    });
  }
  await prisma.tg.createMany({ data: tgAttributes });

  console.log("Creating Teachers...");
  const teacherAttributes = [];
  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email();
    teacherAttributes.push({
      name: faker.name.findName(),
      email: email,
      passHash: await hashPassword(email),
      phoneNo: faker.phone.phoneNumber(),
      pictureUrl: faker.internet.url(),
      role: UserRole.teacher,
    });
  }
  await prisma.teacher.createMany({ data: teacherAttributes });

  console.log("Creating Parents...");
  const parentsAttributes = [];
  for (let i = 0; i <= 10; i++) {
    const email = faker.internet.email();
    parentsAttributes.push({
      name: faker.name.findName(),
      email: email,
      passHash: await hashPassword(email),
      phoneNo: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      role: UserRole.parent,
    });
  }
  await prisma.parents.createMany({ data: parentsAttributes });

  console.log("Creating Students...");
  const studentAttributes = [];
  for (let i = 0; i <= 100; i++) {
    const email = faker.internet.email();
    let gender = "male";
    if (i % 2 == 0) {
      gender = "female";
    }
    studentAttributes.push({
      name: faker.name.findName(),
      pictureUrl: faker.internet.url(),
      email: email,
      passHash: await hashPassword(email),
      phoneNo: faker.phone.phoneNumber(),
      gender: gender,
      age: faker.datatype.number({ min: 18, max: 23 }),
      dateOfBirth: new Date().toISOString(),
      department: "CSE",
      rollNo: `CS${faker.internet.port()}`,
      address: faker.address.streetAddress(),
      cast: faker.address.countryCode(),
      religion: faker.address.direction(),
      seatType: "Seat Type",
      admissionDate: faker.date.between("june", "august").toString(),
      role: UserRole.student,
    });
  }
  await prisma.student.createMany({ data: studentAttributes });
};

seed();
