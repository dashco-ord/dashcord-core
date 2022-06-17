import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const maxLimit = 50;

const StudentsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  if (req.method == "GET") {
    //@ts-ignore
    const page = parseInt(req.query?.page ?? "1") ?? 1; // @ts-ignore
    const limit = parseInt(req.query?.limit ?? "10") ?? 10; // @ts-ignore
    const fetchStats = req.query.stats == "true";
    const perPage = limit > maxLimit ? maxLimit : limit;
    const offset = (page - 1) * perPage;
    const yearFilter = req.query.y ?? "all";

    const query = {
      where: {
        //@ts-ignore
        year: yearFilter != "all" ? yearFilter : undefined,
      },
    };

    //@ts-ignore
    const students = await prisma.student.findMany({
      ...query,
      include:{
        Tg:true
      },
      orderBy:{rollNo:"asc"},
      skip: offset,
      take: perPage,
    });

    const resData = {
      students: students ?? [],
      limit: perPage,
      stats: {},
    };

    if (fetchStats) {
      //@ts-ignore
      const total = await prisma.student.count({ ...query });
      const totalMale = await prisma.student.count({
        where: {
          gender: "male",
        },
      });
      const totalFemale = await prisma.student.count({
        where: {
          gender: "female",
        },
      });

      resData.stats = {
        total,
        totalMale,
        totalFemale,
      };
    } else {
      // @ts-ignore
      resData.stats = undefined;
    }

    res.json(resData);
  }
};

export default StudentsRoute;
