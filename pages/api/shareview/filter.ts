import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function filters(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const selectedFilter = await req.body.data;
  try {
    const result = await prisma.experience.findMany({
      orderBy: {
        createdAt:
          selectedFilter == 'latest'
            ? 'desc'
            : selectedFilter == 'oldest'
            ? 'asc'
            : undefined,
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
  res.status(200).end();
}
