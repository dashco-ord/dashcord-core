import { Assesments, Subjects, UserRole } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "lib/prisma";

const updateAssesment = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method == "POST") {
    if (session?.role == UserRole.TG) {
      const { data, assesmentType, year } = await req.body;
      try {
        data.map(
          async (assesment: Assesments) =>
            await prisma.assesments.create({
              data: {
                name: assesmentType,
                rollNo: assesment.rollNo,
                score1: assesment.score1,
                score2: assesment.score2,
                score3: assesment.score3,
                score4: assesment.score4,
                score5: assesment.score5,
                subject1: year == 3 ? Subjects.AI : null,
                subject2: year == 3 ? Subjects.CN : null,
                subject3: year == 3 ? Subjects.DP : null,
                subject4: year == 3 ? Subjects.FE : null,
                subject5: year == 3 ? Subjects.SEPM : null,
              },
            })
        );
        res.status(200).end();
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    }
    res.status(401).end();
  }
  res.status(405).end();
};

export default updateAssesment;
