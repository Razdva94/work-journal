import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateJournalEntryInput,
  JournalEntry,
  UpdateJournalEntryInput,
} from '@/entities/journal-entry';
import { createJournalEntry, updateJournalEntry } from '@/shared/api';

export function useJournalEntryForm(onSuccess: () => void) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (input: CreateJournalEntryInput) => createJournalEntry(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateJournalEntryInput;
    }) => updateJournalEntry(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
      onSuccess();
    },
  });

  return { createMutation, updateMutation };
}

export function entryToFormState(entry: JournalEntry) {
  return {
    performedAt: entry.performedAt,
    workTypeId: entry.workType.id,
    volume: String(entry.volume),
    unit: entry.unit,
    workerName: entry.workerName,
  };
}

export type JournalEntryFormState = ReturnType<typeof emptyFormState>;

export function emptyFormState() {
  return {
    performedAt: new Date().toISOString().slice(0, 10),
    workTypeId: '',
    volume: '',
    unit: '',
    workerName: '',
  };
}
