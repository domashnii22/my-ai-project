import { api } from '@/shared/api/baseApi';
import type { Expense, CreateExpenseDto, UpdateExpenseDto, ExpenseFilters, PaginatedResult } from '../model/types';

export const expenseApi = {
  getAll: (filters: ExpenseFilters) =>
    api.get<PaginatedResult<Expense>>('/expenses', { params: filters }).then((r) => r.data),

  getOne: (id: string) =>
    api.get<Expense>(`/expenses/${id}`).then((r) => r.data),

  create: (dto: CreateExpenseDto) =>
    api.post<Expense>('/expenses', dto).then((r) => r.data),

  update: (id: string, dto: UpdateExpenseDto) =>
    api.patch<Expense>(`/expenses/${id}`, dto).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/expenses/${id}`),
};

export const statsApi = {
  get: (dateFrom?: string, dateTo?: string) =>
    api
      .get<{ categoryId: string; categoryName: string; total: string; count: string }[]>(
        '/expenses/stats',
        { params: { dateFrom, dateTo } },
      )
      .then((r) => r.data),
};
