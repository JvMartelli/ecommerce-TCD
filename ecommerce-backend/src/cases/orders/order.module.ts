import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './order.entity'
import { OrderItem } from './order-item.entity'
import { Product } from '../products/product.entity'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Product   
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
