import { useQuery } from '@tanstack/react-query';
import { fetchWorkTypes } from '@/shared/api';

export function useWorkTypes() {
  return useQuery({
    queryKey: ['work-types'],
    queryFn: fetchWorkTypes,
  });
}
