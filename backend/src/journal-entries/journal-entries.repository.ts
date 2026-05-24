import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JournalEntryWithWorkType } from './journal-entry.types.js';

const workTypeInclude = {
  workType: { select: { id: true, name: true } },
} as const;

@Injectable()
export class JournalEntriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany(
    where: Prisma.JournalEntryWhereInput,
    orderBy: Prisma.JournalEntryOrderByWithRelationInput,
  ): Promise<JournalEntryWithWorkType[]> {
    return this.prisma.journalEntry.findMany({
      where,
      orderBy,
      include: workTypeInclude,
    });
  }

  findById(id: string): Promise<JournalEntryWithWorkType | null> {
    return this.prisma.journalEntry.findUnique({
      where: { id },
      include: workTypeInclude,
    });
  }

  create(
    data: Prisma.JournalEntryCreateInput,
  ): Promise<JournalEntryWithWorkType> {
    return this.prisma.journalEntry.create({
      data,
      include: workTypeInclude,
    });
  }

  update(
    id: string,
    data: Prisma.JournalEntryUpdateInput,
  ): Promise<JournalEntryWithWorkType> {
    return this.prisma.journalEntry.update({
      where: { id },
      data,
      include: workTypeInclude,
    });
  }

  delete(id: string): Promise<void> {
    return this.prisma.journalEntry
      .delete({ where: { id } })
      .then(() => undefined);
  }
}
