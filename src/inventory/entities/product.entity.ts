import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Promotion } from './promotion.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  quantity: number;
  @Column()
  price: number;
  @Column()
  testSync: string;
  @ManyToOne(() => Promotion, (promotion) => promotion.products)
  promotions: Promotion[];
}
