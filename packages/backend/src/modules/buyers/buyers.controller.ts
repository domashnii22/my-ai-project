import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly service: BuyersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateBuyerDto) {
    return this.service.create(dto);
  }
}
