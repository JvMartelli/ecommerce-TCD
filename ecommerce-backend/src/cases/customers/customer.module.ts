import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  controllers: [CustomerController],
})

export class CustomerModule {}