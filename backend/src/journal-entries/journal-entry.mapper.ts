import type { JournalEntryDto, JournalEntryWithWorkType } from './journal-entry.types.js';

export function toJournalEntryDto(row: JournalEntryWithWorkType): JournalEntryDto {
  return {
    id: row.id,
    performedAt: row.performedAt.toISOString().slice(0, 10),
    workType: { id: row.workType.id, name: row.workType.name },
    volume: Number(row.volume),
    unit: row.unit,
    workerName: row.workerName,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
