import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { WorkTypesModule } from '../work-types/work-types.module.js';
import { JournalEntriesController } from './journal-entries.controller.js';
import { JournalEntriesRepository } from './journal-entries.repository.js';
import { JournalEntriesService } from './journal-entries.service.js';

@Module({
  imports: [PrismaModule, WorkTypesModule],
  controllers: [JournalEntriesController],
  providers: [JournalEntriesRepository, JournalEntriesService],
})
export class JournalEntriesModule {}
