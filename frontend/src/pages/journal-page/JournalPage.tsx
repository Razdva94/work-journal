import { useState } from 'react';
import type { JournalEntry, JournalEntryFilters } from '@/entities/journal-entry';
import { JournalEntryForm } from '@/features/journal-entry-form';
import { JournalFilters, JournalList } from '@/features/journal-list';
import { JournalLayout } from '@/widgets/journal-layout';
import styles from './journalPage.module.scss';

export const JournalPage = () => {
  const [filters, setFilters] = useState<JournalEntryFilters>({ sort: 'desc' });
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  return (
    <JournalLayout>
      <section className={styles.listSection}>
        <JournalFilters filters={filters} onChange={setFilters} />
        <JournalList
          filters={filters}
          onEdit={(entry) => setEditingEntry(entry)}
        />
      </section>
      <JournalEntryForm
        editingEntry={editingEntry}
        onCancelEdit={() => setEditingEntry(null)}
      />
    </JournalLayout>
  );
};
