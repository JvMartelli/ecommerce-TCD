import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './cases/auth/auth.module';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { CustomerModule } from './cases/customers/customer.module';
import { OrderModule } from './cases/orders/order.module';
import { FavoriteModule } from './cases/favorites/favorite.module';
import { RatingModule } from './cases/ratings/rating.module';

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
    CustomerModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    OrderModule,
    FavoriteModule,
    RatingModule,
  ],
})
export class AppModule {}
