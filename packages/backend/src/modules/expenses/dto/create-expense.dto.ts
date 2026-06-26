import { IsNumber, IsUUID, IsDateString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  buyerId!: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsUUID()
  categoryId!: string;

  @IsDateString()
  purchaseDate!: string;
}
