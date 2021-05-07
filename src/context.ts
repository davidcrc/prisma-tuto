import { db } from './db';
import { PrismaClient } from '@prisma/client';

export interface Context {
  db: PrismaClient;
  request: any
}

export const context = {
  db,
};