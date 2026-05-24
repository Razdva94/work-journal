export type JournalEntryWorkType = {
  id: string;
  name: string;
};

export type JournalEntry = {
  id: string;
  performedAt: string;
  workType: JournalEntryWorkType;
  volume: number;
  unit: string;
  workerName: string;
  createdAt: string;
  updatedAt: string;
};

export type JournalEntryFilters = {
  from?: string;
  to?: string;
  sort?: 'asc' | 'desc';
};

export type CreateJournalEntryInput = {
  performedAt: string;
  workTypeId: string;
  volume: number;
  unit?: string;
  workerName: string;
};

export type UpdateJournalEntryInput = Partial<CreateJournalEntryInput>;
