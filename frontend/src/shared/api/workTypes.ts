import type { WorkType } from '@/entities/work-type';
import { getBackendUrl, readErrorBody } from './apiClient';

export async function fetchWorkTypes(): Promise<WorkType[]> {
  const base = getBackendUrl();
  if (!base) {
    throw new Error('VITE_BACKEND_URL is not set');
  }

  const response = await fetch(`${base}/work-types`);
  if (!response.ok) {
    throw new Error(await readErrorBody(response));
  }

  return response.json() as Promise<WorkType[]>;
}
