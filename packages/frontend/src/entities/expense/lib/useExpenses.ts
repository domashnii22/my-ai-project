import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../api/expenseApi';
import type { ExpenseFilters, CreateExpenseDto, UpdateExpenseDto } from '../model/types';

const EXPENSES_KEY = 'expenses';

export function useExpenses(filters: ExpenseFilters) {
  return useQuery({
    queryKey: [EXPENSES_KEY, filters],
    queryFn: () => expenseApi.getAll(filters),
  });
}

export function useCreateExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateExpenseDto) => expenseApi.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: [EXPENSES_KEY] }),
  });
}

export function useUpdateExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateExpenseDto }) => expenseApi.update(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: [EXPENSES_KEY] }),
  });
}

export function useDeleteExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [EXPENSES_KEY] }),
  });
}
