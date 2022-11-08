import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const { id } = await req.body;
    try {
      await prisma.comments.delete({
        where: {
          id: id,
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
  res.status(405).end();
}
