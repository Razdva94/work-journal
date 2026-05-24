import type { JournalEntry, JournalEntryFilters } from '@/entities/journal-entry';
import { Button } from '@/shared/ui';
import { useJournalList } from '../model/useJournalList';
import styles from './journalList.module.scss';

type Props = {
  filters: JournalEntryFilters;
  onEdit: (entry: JournalEntry) => void;
};

export const JournalList = ({ filters, onEdit }: Props) => {
  const { query, removeMutation } = useJournalList(filters);

  if (query.isLoading) {
    return <p className={styles.message}>Загрузка…</p>;
  }

  if (query.isError) {
    return (
      <p className={styles.error}>
        Ошибка загрузки: {(query.error as Error).message}
      </p>
    );
  }

  const entries = query.data ?? [];

  if (entries.length === 0) {
    return <p className={styles.message}>Записей нет</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Вид работ</th>
            <th>Объём</th>
            <th>Исполнитель</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{formatDate(entry.performedAt)}</td>
              <td>{entry.workType.name}</td>
              <td>
                {entry.volume} {entry.unit}
              </td>
              <td>{entry.workerName}</td>
              <td className={styles.actions}>
                <Button variant="link" onClick={() => onEdit(entry)}>
                  Изменить
                </Button>
                <Button
                  variant="link"
                  onClick={() => {
                    if (
                      window.confirm('Удалить запись?') &&
                      !removeMutation.isPending
                    ) {
                      removeMutation.mutate(entry.id);
                    }
                  }}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}
