import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";

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
  for (let i = 0; i <= 10; i++) {
    await prisma.hod.create({
      //@ts-ignore
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        gender: faker.address.countryCode(),
        portfolio: faker.internet.url(),
        pictureUrl: faker.internet.url(),
        bio: faker.address.secondaryAddress(),
        department: faker.address.countryCode(),
        role: UserRole.hod,
      },
    });
  }

  console.log("Creating TG Incharge's...");
  for (let i = 0; i <= 10; i++) {
    await prisma.tgIncharge.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        pictureUrl: faker.internet.url(),
        role: UserRole.incharge,
      },
    });
  }

  console.log("Creating TG...");
  for (let i = 0; i <= 10; i++) {
    let gender = "male";
    if (i % 2 == 0) {
      gender = "female";
    }
    await prisma.tg.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNo: faker.phone.phoneNumber(),
        pictureUrl: faker.internet.url(),
        gender: gender,
        department: "CSE",
        role: UserRole.tg,
      },
    });
  }

  console.log("Creating Teachers...");
  for (let i = 0; i <= 10; i++) {
    await prisma.teacher.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNo: faker.phone.phoneNumber(),
        pictureUrl: faker.internet.url(),
        role: UserRole.teacher,
      },
    });
  }

  console.log("Creating Parents...");
  for (let i = 0; i <= 10; i++) {
    await prisma.parents.create({
      data: {
        name: faker.name.findName(),
        phoneNo: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        role: UserRole.parent,
      },
    });
  }

  console.log("Creating Students...");
  for (let i = 0; i <= 100; i++) {
    let gender = "male";
    if (i % 2 == 0) {
      gender = "female";
    }
    await prisma.student.create({
      data: {
        name: faker.name.findName(),
        pictureUrl: faker.internet.url(),
        email: faker.internet.email(),
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
      },
    });
  }
};

seed();
