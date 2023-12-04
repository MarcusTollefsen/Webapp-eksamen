import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const athletes = await prisma.athlete.findMany();
    res.status(200).json(athletes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
