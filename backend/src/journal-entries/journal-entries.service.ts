import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { WorkTypesRepository } from '../work-types/work-types.repository.js';
import type { CreateJournalEntryDto } from './dto/create-journal-entry.dto.js';
import type { ListJournalEntriesQueryDto } from './dto/list-journal-entries.query.dto.js';
import type { UpdateJournalEntryDto } from './dto/update-journal-entry.dto.js';
import { JournalEntriesRepository } from './journal-entries.repository.js';
import { toJournalEntryDto } from './journal-entry.mapper.js';
import type { JournalEntryDto } from './journal-entry.types.js';

@Injectable()
export class JournalEntriesService {
  constructor(
    private readonly journalEntriesRepository: JournalEntriesRepository,
    private readonly workTypesRepository: WorkTypesRepository,
  ) {}

  async findAll(query: ListJournalEntriesQueryDto): Promise<JournalEntryDto[]> {
    const where: Prisma.JournalEntryWhereInput = {};

    if (query.from || query.to) {
      where.performedAt = {};
      if (query.from) {
        where.performedAt.gte = this.parseDateOnly(query.from);
      }
      if (query.to) {
        where.performedAt.lte = this.parseDateOnly(query.to);
      }
    }

    const rows = await this.journalEntriesRepository.findMany(where, {
      performedAt: query.sort ?? 'desc',
    });

    return rows.map(toJournalEntryDto);
  }

  async create(dto: CreateJournalEntryDto): Promise<JournalEntryDto> {
    const workType = await this.requireWorkType(dto.workTypeId);
    const unit = dto.unit?.trim() || workType.unit;

    const row = await this.journalEntriesRepository.create({
      performedAt: this.parseDateOnly(dto.performedAt),
      workType: { connect: { id: dto.workTypeId } },
      volume: new Prisma.Decimal(dto.volume),
      unit,
      workerName: dto.workerName.trim(),
    });

    return toJournalEntryDto(row);
  }

  async update(
    id: string,
    dto: UpdateJournalEntryDto,
  ): Promise<JournalEntryDto> {
    await this.requireEntry(id);

    let unit: string | undefined;
    if (dto.workTypeId) {
      const workType = await this.requireWorkType(dto.workTypeId);
      unit = dto.unit?.trim() || workType.unit;
    } else if (dto.unit !== undefined) {
      unit = dto.unit.trim();
    }

    const row = await this.journalEntriesRepository.update(id, {
      ...(dto.performedAt !== undefined
        ? { performedAt: this.parseDateOnly(dto.performedAt) }
        : {}),
      ...(dto.workTypeId !== undefined
        ? { workType: { connect: { id: dto.workTypeId } } }
        : {}),
      ...(dto.volume !== undefined
        ? { volume: new Prisma.Decimal(dto.volume) }
        : {}),
      ...(unit !== undefined ? { unit } : {}),
      ...(dto.workerName !== undefined
        ? { workerName: dto.workerName.trim() }
        : {}),
    });

    return toJournalEntryDto(row);
  }

  async remove(id: string): Promise<void> {
    await this.requireEntry(id);
    await this.journalEntriesRepository.delete(id);
  }

  private async requireEntry(id: string) {
    const row = await this.journalEntriesRepository.findById(id);
    if (!row) {
      throw new NotFoundException(`Journal entry ${id} not found`);
    }
    return row;
  }

  private async requireWorkType(id: string) {
    const row = await this.workTypesRepository.findById(id);
    if (!row) {
      throw new BadRequestException(`Work type ${id} not found`);
    }
    return row;
  }

  private parseDateOnly(value: string): Date {
    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid date: ${value}`);
    }
    return date;
  }
}
