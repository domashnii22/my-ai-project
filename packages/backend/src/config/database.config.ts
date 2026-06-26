import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../modules/expenses/entities/expense.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Buyer } from '../modules/buyers/entities/buyer.entity';

export const ConfigModule: DynamicModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME || 'expenses',
  entities: [Expense, Category, Buyer],
  synchronize: true,
});
