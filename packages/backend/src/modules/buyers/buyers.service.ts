import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from './entities/buyer.entity';
import { CreateBuyerDto } from './dto/create-buyer.dto';

@Injectable()
export class BuyersService {
  constructor(
    @InjectRepository(Buyer)
    private readonly repo: Repository<Buyer>,
  ) {}

  async findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async create(dto: CreateBuyerDto) {
    const exists = await this.repo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Buyer already exists');
    const buyer = this.repo.create(dto);
    return this.repo.save(buyer);
  }
}
