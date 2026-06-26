import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
