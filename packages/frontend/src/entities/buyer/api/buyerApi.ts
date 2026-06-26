import { api } from '@/shared/api/baseApi';
import type { Buyer } from '../model/types';

export const buyerApi = {
  getAll: () => api.get<Buyer[]>('/buyers').then((r) => r.data),
};
