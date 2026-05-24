import { useEffect, useState } from 'react';
import type { JournalEntry } from '@/entities/journal-entry';
import { useWorkTypes } from '@/entities/work-type';
import { Button, FormField, Input, Select } from '@/shared/ui';
import {
  emptyFormState,
  entryToFormState,
  useJournalEntryForm,
  type JournalEntryFormState,
} from '../model/useJournalEntryForm';
import styles from './journalEntryForm.module.scss';

type Props = {
  editingEntry: JournalEntry | null;
  onCancelEdit: () => void;
};

export const JournalEntryForm = ({ editingEntry, onCancelEdit }: Props) => {
  const workTypesQuery = useWorkTypes();
  const [form, setForm] = useState<JournalEntryFormState>(emptyFormState);
  const [clientError, setClientError] = useState<string | null>(null);

  const resetForm = () => {
    setForm(emptyFormState());
    setClientError(null);
    onCancelEdit();
  };

  const { createMutation, updateMutation } = useJournalEntryForm(resetForm);

  useEffect(() => {
    if (editingEntry) {
      setForm(entryToFormState(editingEntry));
    } else {
      setForm(emptyFormState());
    }
    setClientError(null);
  }, [editingEntry]);

  const workTypeOptions =
    workTypesQuery.data?.map((wt) => ({
      value: wt.id,
      label: `${wt.name} (${wt.unit})`,
    })) ?? [];

  const selectedWorkType = workTypesQuery.data?.find(
    (wt) => wt.id === form.workTypeId,
  );

  const handleWorkTypeChange = (workTypeId: string) => {
    const wt = workTypesQuery.data?.find((x) => x.id === workTypeId);
    setForm((prev) => ({
      ...prev,
      workTypeId,
      unit: wt?.unit ?? prev.unit,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError(null);

    const volume = Number.parseFloat(form.volume.replace(',', '.'));
    if (!form.performedAt || !form.workTypeId || !form.workerName.trim()) {
      setClientError('Заполните обязательные поля');
      return;
    }
    if (!Number.isFinite(volume) || volume <= 0) {
      setClientError('Укажите положительный объём');
      return;
    }

    const payload = {
      performedAt: form.performedAt,
      workTypeId: form.workTypeId,
      volume,
      unit: form.unit.trim() || selectedWorkType?.unit,
      workerName: form.workerName.trim(),
    };

    if (editingEntry) {
      updateMutation.mutate({ id: editingEntry.id, input: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const mutation = editingEntry ? updateMutation : createMutation;
  const serverError = mutation.isError
    ? (mutation.error as Error).message
    : null;

  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>
        {editingEntry ? 'Редактирование записи' : 'Новая запись'}
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormField label="Дата выполнения *">
          <Input
            type="date"
            value={form.performedAt}
            onChange={(v) => setForm((p) => ({ ...p, performedAt: v }))}
            required
          />
        </FormField>
        <FormField label="Вид работ *">
          <Select
            value={form.workTypeId}
            onChange={handleWorkTypeChange}
            options={workTypeOptions}
            required
          />
        </FormField>
        <FormField label="Объём *">
          <Input
            type="number"
            value={form.volume}
            onChange={(v) => setForm((p) => ({ ...p, volume: v }))}
            min="0"
            step="any"
            required
          />
        </FormField>
        <FormField label="Единица измерения">
          <Input
            value={form.unit}
            onChange={(v) => setForm((p) => ({ ...p, unit: v }))}
            placeholder={selectedWorkType?.unit ?? 'м³'}
          />
        </FormField>
        <FormField label="ФИО исполнителя *">
          <Input
            value={form.workerName}
            onChange={(v) => setForm((p) => ({ ...p, workerName: v }))}
            required
          />
        </FormField>
        {(clientError || serverError) && (
          <p className={styles.error}>{clientError ?? serverError}</p>
        )}
        <div className={styles.actions}>
          <Button type="submit" disabled={mutation.isPending}>
            {editingEntry ? 'Сохранить' : 'Добавить'}
          </Button>
          {editingEntry ? (
            <Button type="button" variant="outline" onClick={resetForm}>
              Отмена
            </Button>
          ) : null}
        </div>
      </form>
    </section>
  );
};
