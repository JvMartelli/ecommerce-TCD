import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from './order.entity'
import { OrderItem } from './order-item.entity'
import { Product } from '../products/product.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orders: Repository<Order>,
    @InjectRepository(OrderItem) private items: Repository<OrderItem>,
    @InjectRepository(Product) private products: Repository<Product>,
  ) {}

  findByCustomer(customerId: string) {
    return this.orders.find({
      where: { customerId },
      relations: ['items', 'customer'],
      order: { createdAt: 'DESC' }
    })
  }

  async create(data: any) {

    const order = this.orders.create({
      customerId: data.customerId,
      total: data.total,
      address: data.address,
      status: 'aguardando faturamento'
    })

    const savedOrder = await this.orders.save(order)

    const itemsToSave: OrderItem[] = []

    for (const i of data.items) {
      const product = await this.products.findOne({
        where: { id: i.productId }
      })

     
      if (!product) {
        throw new NotFoundException(
          `Produto com ID ${i.productId} não encontrado`
        )
      }

     
      const item = this.items.create({
        orderId: savedOrder.id,
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        unitPrice: Number(product.price),
        quantity: Number(i.quantity),
        subtotal: Number(product.price) * Number(i.quantity)
      })

      itemsToSave.push(item)
    }

    await this.items.save(itemsToSave)

    return this.orders.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'customer']
    })
  }
}
