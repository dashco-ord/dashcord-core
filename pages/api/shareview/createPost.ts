import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { title, body, role, company, salary, criteria, link, tags } =
    await req.body;

  try {
    await prisma.experience.create({
      data: {
        body: body,
        title: title,
        role: role,
        company: company,
        salary: salary,
        criteria: criteria,
        link: link,
        tags: tags,
        //@ts-ignore
        by: session?.user?.email,
      },
    });

    res.status(200).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }

  res.status(405).end();
  return;
}
