import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function filterEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const selectedFilter = await req.body.data;
  if (selectedFilter != 'all') {
    try {
      const results = await prisma.events.findMany({
        where: { type: selectedFilter },
      });
      res.json(results);
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
  res.status(200).end();
}
