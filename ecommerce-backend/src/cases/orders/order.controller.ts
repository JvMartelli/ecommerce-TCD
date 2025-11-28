import { Controller, Post, Get, Body, Param } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body)
  }

  @Get('/customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.service.findByCustomer(customerId)
  }
}
