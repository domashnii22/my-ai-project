import { Module } from '@nestjs/common';
import { ConfigModule } from './config/database.config';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BuyersModule } from './modules/buyers/buyers.module';
import { SeederService } from './common/seeders/seeder.service';

@Module({
  imports: [ConfigModule, ExpensesModule, CategoriesModule, BuyersModule],
  providers: [SeederService],
})
export class AppModule {}
