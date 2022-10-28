import { UserRole } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/prisma';

export default async function resourcesRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session?.role === UserRole.TNP) {
    if (req.method === 'POST') {
      const { title, links, body } = await req.body;
      try {
        await prisma.placementMaterial.create({
          data: {
            title: title,
            links: links,
            body: body,
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
  res.status(401).end();
}
