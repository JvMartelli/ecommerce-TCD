import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { AuthModule } from './cases/auth/auth.module';
import { CustomerModule } from './cases/customers/customer.module';
import { OrderModule } from './cases/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false }
    }),

    AuthModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    CustomerModule,
    OrderModule
  ],
})
export class AppModule {}
