import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i <= 10; i++) {
    await prisma.teacher.create({
      data: {
        name: "Some Name",
        email: "someemail@gmail.com",
        phoneNo: "4440026",
        pictureUrl: "https://somename.com",
      },
    });
  }
};

seed();
