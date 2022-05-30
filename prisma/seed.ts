import { prisma } from "../lib/prisma";
import { teacherGuardians, hods } from "./data";

const main = async () => {
  console.log("\n Deleting existing Data... \n");
  await prisma.tg.deleteMany();
  await prisma.hod.deleteMany();

  console.log("Creating new data \n");

  console.log("Createing HOD's");
  await prisma.hod.createMany({ data: hods });

  console.log("Createing TG's");
  await prisma.tg.createMany({ data: teacherGuardians });
};

main();
