import type {
  CreateJournalEntryInput,
  JournalEntry,
  JournalEntryFilters,
  UpdateJournalEntryInput,
} from '@/entities/journal-entry';
import { getBackendUrl, readErrorBody } from './apiClient';

function buildQuery(filters: JournalEntryFilters): string {
  const params = new URLSearchParams();
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  if (filters.sort) params.set('sort', filters.sort);
  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function fetchJournalEntries(
  filters: JournalEntryFilters,
): Promise<JournalEntry[]> {
  const base = getBackendUrl();
  if (!base) {
    throw new Error('VITE_BACKEND_URL is not set');
  }

  const response = await fetch(
    `${base}/journal-entries${buildQuery(filters)}`,
  );
  if (!response.ok) {
    throw new Error(await readErrorBody(response));
  }

  return response.json() as Promise<JournalEntry[]>;
}

export async function createJournalEntry(
  input: CreateJournalEntryInput,
): Promise<JournalEntry> {
  const base = getBackendUrl();
  if (!base) {
    throw new Error('VITE_BACKEND_URL is not set');
  }

  const response = await fetch(`${base}/journal-entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(await readErrorBody(response));
  }

  return response.json() as Promise<JournalEntry>;
}

export async function updateJournalEntry(
  id: string,
  input: UpdateJournalEntryInput,
): Promise<JournalEntry> {
  const base = getBackendUrl();
  if (!base) {
    throw new Error('VITE_BACKEND_URL is not set');
  }

  const response = await fetch(`${base}/journal-entries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(await readErrorBody(response));
  }

  return response.json() as Promise<JournalEntry>;
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const base = getBackendUrl();
  if (!base) {
    throw new Error('VITE_BACKEND_URL is not set');
  }

  const response = await fetch(`${base}/journal-entries/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(await readErrorBody(response));
  }
}
