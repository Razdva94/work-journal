import type { JournalEntry, WorkType } from '@prisma/client';

export type JournalEntryWithWorkType = JournalEntry & {
  workType: Pick<WorkType, 'id' | 'name'>;
};

export type JournalEntryWorkTypeDto = {
  id: string;
  name: string;
};

export type JournalEntryDto = {
  id: string;
  performedAt: string;
  workType: JournalEntryWorkTypeDto;
  volume: number;
  unit: string;
  workerName: string;
  createdAt: string;
  updatedAt: string;
};
