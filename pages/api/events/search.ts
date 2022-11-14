import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function searchEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery: string = await req.body.data;
  try {
    const result = await prisma.events.findMany({
      where: {
        title: {
          contains: searchQuery,
        },
      },
    });
    res.json(result);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
