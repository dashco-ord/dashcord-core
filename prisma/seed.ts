import { prisma } from "../lib/prisma";
import { teacherGuardians } from "./data";

const main = async () => {
  await prisma.tg.deleteMany()
  console.log("\n Createing TG's")
  await prisma.tg.createMany({data:teacherGuardians})
}

main()