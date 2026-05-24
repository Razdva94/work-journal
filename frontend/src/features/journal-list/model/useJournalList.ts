import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { JournalEntryFilters } from '@/entities/journal-entry';
import { deleteJournalEntry, fetchJournalEntries } from '@/shared/api';

export function useJournalList(filters: JournalEntryFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['journal-entries', filters],
    queryFn: () => fetchJournalEntries(filters),
  });

  const removeMutation = useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['journal-entries'] });
    },
  });

  return { query, removeMutation };
}
