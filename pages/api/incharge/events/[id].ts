import { UserRole } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/prisma';

export default async function eventCrudRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (session?.role === UserRole.INCHARGE) {
    const id = req.query.id;

    if (req.method === 'DELETE') {
      try {
        await prisma.events.delete({
          where: {
            //@ts-ignore
            id: id,
          },
        });
        res.status(200).end();
        return;
      } catch (error) {
        console.log(error); // @todo : replace with logger
        res.status(500).end();
        return;
      }
    }

    if (req.method === 'POST') {
      const { title, link, date, status, body, winner } = await req.body;
      try {
        await prisma.events.update({
          where: {
            //@ts-ignore
            id: id,
          },
          data: {
            title: title,
            regLink: link,
            date: date,
            status: status,
            body: body,
            winner: winner,
          },
        });
        res.status(200).end();
        return;
      } catch (error) {
        console.log(error); // @todo : replace with logger
        res.status(500).end();
        return;
      }
    }

    res.status(401).end();
    return;
  }

  res.status(405).end();
  return;
}
