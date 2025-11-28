import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  productId: string;

  @Column({ nullable: true })
  productName: string;

  @Column({ nullable: true })
  productImage: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  unitPrice: number;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  subtotal: number;
}
