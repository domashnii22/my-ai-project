import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyersController } from './buyers.controller';
import { BuyersService } from './buyers.service';
import { Buyer } from './entities/buyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buyer])],
  controllers: [BuyersController],
  providers: [BuyersService],
  exports: [TypeOrmModule],
})
export class BuyersModule {}
