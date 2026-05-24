import type { JournalEntryFilters } from '@/entities/journal-entry';
import { Button, FormField, Input } from '@/shared/ui';
import styles from './journalFilters.module.scss';

type Props = {
  filters: JournalEntryFilters;
  onChange: (filters: JournalEntryFilters) => void;
};

export const JournalFilters = ({ filters, onChange }: Props) => (
  <div className={styles.row}>
    <FormField label="С даты">
      <Input
        type="date"
        value={filters.from ?? ''}
        onChange={(v) => onChange({ ...filters, from: v || undefined })}
      />
    </FormField>
    <FormField label="По дату">
      <Input
        type="date"
        value={filters.to ?? ''}
        onChange={(v) => onChange({ ...filters, to: v || undefined })}
      />
    </FormField>
    <FormField label="Сортировка по дате">
      <select
        className={styles.sort}
        value={filters.sort ?? 'desc'}
        onChange={(e) =>
          onChange({
            ...filters,
            sort: e.target.value as 'asc' | 'desc',
          })
        }
      >
        <option value="desc">Сначала новые</option>
        <option value="asc">Сначала старые</option>
      </select>
    </FormField>
    <Button
      variant="outline"
      onClick={() => onChange({ sort: filters.sort ?? 'desc' })}
    >
      Сбросить даты
    </Button>
  </div>
);
