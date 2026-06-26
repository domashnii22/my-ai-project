import { api } from '@/shared/api/baseApi';
import type { Category } from '../model/types';

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories').then((r) => r.data),
};
