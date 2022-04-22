import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const seed = async () => {
  console.log("Creating Teachers...");
  for (let i = 0; i <= 100; i++) {
    await prisma.teacher.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phoneNo: faker.phone.phoneNumber(),
        pictureUrl: faker.internet.url(),
      },
    });
  }
};

seed();
