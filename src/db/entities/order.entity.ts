// src/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Just store productId as UUID without referencing the actual Product entity
  @Column('uuid')
  productId: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'varchar' })
  status: 'pending' | 'confirmed' | 'shipped';
}
