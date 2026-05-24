import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto.js';
import { ListJournalEntriesQueryDto } from './dto/list-journal-entries.query.dto.js';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto.js';
import { JournalEntriesService } from './journal-entries.service.js';
import type { JournalEntryDto } from './journal-entry.types.js';

@Controller('journal-entries')
export class JournalEntriesController {
  constructor(private readonly journalEntriesService: JournalEntriesService) {}

  @Get()
  findAll(
    @Query() query: ListJournalEntriesQueryDto,
  ): Promise<JournalEntryDto[]> {
    return this.journalEntriesService.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateJournalEntryDto): Promise<JournalEntryDto> {
    return this.journalEntriesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJournalEntryDto,
  ): Promise<JournalEntryDto> {
    return this.journalEntriesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.journalEntriesService.remove(id);
  }
}
