import { Injectable } from '@nestjs/common';
import type { WorkType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class WorkTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Pick<WorkType, 'id' | 'name' | 'unit'>[]> {
    return this.prisma.workType.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, unit: true },
    });
  }

  findById(id: string): Promise<WorkType | null> {
    return this.prisma.workType.findUnique({ where: { id } });
  }
}
