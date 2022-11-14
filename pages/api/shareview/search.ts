import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = await req.body.data;
  try {
    const results = await prisma.experience.findMany({
      where: {
        tags: { contains: searchQuery },
      },
      include: { Student: { select: { name: true } } },
    });
    res.json(results);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
