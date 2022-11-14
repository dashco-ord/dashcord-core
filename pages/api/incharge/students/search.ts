import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

const searchStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (req.method == 'POST') {
    if (session?.role == UserRole.INCHARGE) {
      const searchQuery = await req.body.data;
      const students = await prisma.student.findMany({
        where: { name: { contains: searchQuery } },
      });
      res.json(students);
      res.status(200).end();
    }
  }
  res.status(405).end();
};

export default searchStudents;
