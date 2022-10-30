import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

export default async function updatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = await req.body;

  try {
    await prisma.experience.delete({
      where: { id: id },
    });
    res.status(200).end();
    return;
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
