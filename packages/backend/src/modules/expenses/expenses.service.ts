import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryExpenseDto } from './dto/query-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly repo: Repository<Expense>,
  ) {}

  async findAll(query: QueryExpenseDto) {
    const qb = this.repo.createQueryBuilder('e');

    qb.leftJoinAndSelect('e.category', 'category');
    qb.leftJoinAndSelect('e.buyer', 'buyer');

    if (query.buyerId) {
      qb.andWhere('e.buyerId = :buyerId', { buyerId: query.buyerId });
    }
    if (query.categoryId) {
      qb.andWhere('e.categoryId = :categoryId', { categoryId: query.categoryId });
    }
    if (query.dateFrom) {
      qb.andWhere('e.purchaseDate >= :dateFrom', { dateFrom: query.dateFrom });
    }
    if (query.dateTo) {
      qb.andWhere('e.purchaseDate <= :dateTo', { dateTo: query.dateTo });
    }

    const total = await qb.getCount();

    const items = await qb
      .orderBy('e.purchaseDate', query.order ?? 'DESC')
      .skip(query.skip ?? 0)
      .take(query.take ?? 20)
      .getMany();

    return {
      items: items.map((e) => ({
        id: e.id,
        buyerId: e.buyerId,
        buyerName: e.buyer.name,
        amount: Number(e.amount),
        categoryId: e.categoryId,
        categoryName: e.category.name,
        purchaseDate: e.purchaseDate,
        createdAt: e.createdAt.toISOString(),
      })),
      total,
      skip: query.skip ?? 0,
      take: query.take ?? 20,
    };
  }

  async findOne(id: string) {
    const expense = await this.repo.findOne({
      where: { id },
      relations: ['category', 'buyer'],
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async create(dto: CreateExpenseDto) {
    const expense = this.repo.create(dto);
    const saved = await this.repo.save(expense);
    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpdateExpenseDto) {
    const expense = await this.findOne(id);
    Object.assign(expense, dto);
    const saved = await this.repo.save(expense);
    return this.findOne(saved.id);
  }

  async remove(id: string) {
    const expense = await this.findOne(id);
    await this.repo.remove(expense);
  }

  async getStats(dateFrom?: string, dateTo?: string) {
    const qb = this.repo.createQueryBuilder('e');
    qb.leftJoin('e.category', 'category');
    qb.select('category.id', 'categoryId');
    qb.addSelect('category.name', 'categoryName');
    qb.addSelect('SUM(e.amount)', 'total');
    qb.addSelect('COUNT(e.id)', 'count');
    qb.groupBy('category.id');
    qb.addGroupBy('category.name');

    if (dateFrom) qb.andWhere('e.purchaseDate >= :dateFrom', { dateFrom });
    if (dateTo) qb.andWhere('e.purchaseDate <= :dateTo', { dateTo });

    return qb.getRawMany<{
      categoryId: string;
      categoryName: string;
      total: string;
      count: string;
    }>();
  }
}
