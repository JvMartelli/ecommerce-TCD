import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import type { Customer } from '../customers/customer.entity'
import type { OrderItem } from './order-item.entity'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => require('../customers/customer.entity').Customer)
  customer: Customer

  @Column()
  customerId: string

  @OneToMany(() => require('./order-item.entity').OrderItem, (item: OrderItem) => item.order, { cascade: true })
  items: OrderItem[]

  @Column('decimal', { precision: 10, scale: 2 })
  total: number

  @Column()
  address: string

  @Column()
  status: string

  @CreateDateColumn()
  createdAt: Date
}
