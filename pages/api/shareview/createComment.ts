import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const { body, by, experienceId } = await req.body;
    try {
      await prisma.comments.create({
        data: {
          body: body,
          by: by,
          experienceId: experienceId,
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
