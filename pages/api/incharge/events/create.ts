import { UserRole } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/prisma';
import { type } from 'os';

export default async function CreateEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session?.role === UserRole.INCHARGE) {
    if (req.method == 'POST') {
      const { title, link, date, status, body, type } = await req.body;
      try {
        await prisma.events.create({
          data: {
            title: title,
            regLink: link,
            date: date,
            status: status,
            type: type,
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
