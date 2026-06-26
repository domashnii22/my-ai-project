export interface CreateExpenseDto {
  buyerId: string;
  amount: number;
  categoryId: string;
  purchaseDate: string;
}

export interface UpdateExpenseDto extends Partial<CreateExpenseDto> {}

export interface ExpenseFilters {
  buyerId?: string;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
  skip?: number;
  take?: number;
  order?: 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  skip: number;
  take: number;
}
