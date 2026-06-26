import { useQuery } from '@tanstack/react-query';
import { buyerApi } from '../api/buyerApi';

export function useBuyers() {
  return useQuery({
    queryKey: ['buyers'],
    queryFn: buyerApi.getAll,
  });
}
