import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buyer } from '../../modules/buyers/entities/buyer.entity';
import { Category } from '../../modules/categories/entities/category.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepo: Repository<Buyer>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedBuyers();
    await this.seedCategories();
  }

  private async seedBuyers() {
    const count = await this.buyerRepo.count();
    if (count > 0) return;

    await this.buyerRepo.save([
      { name: 'Алексей' },
      { name: 'Анастасия' },
    ]);
    console.log('Seeded buyers');
  }

  private async seedCategories() {
    const count = await this.categoryRepo.count();
    if (count > 0) return;

    await this.categoryRepo.save([
      { name: 'Продукты' },
      { name: 'Транспорт' },
      { name: 'Коммунальные услуги' },
      { name: 'Развлечения' },
      { name: 'Здоровье' },
      { name: 'Одежда' },
      { name: 'Прочее' },
    ]);
    console.log('Seeded categories');
  }
}
