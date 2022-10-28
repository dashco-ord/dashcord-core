import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, body, role, company, salary, criteria, link, tags } =
    await req.body;

  try {
    await prisma.experience.update({
      where: { id: id },
      data: {
        body: body,
        title: title,
        role: role,
        company: company,
        salary: salary,
        criteria: criteria,
        link: link,
        tags: tags,
      },
    });
    res.status(200).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
