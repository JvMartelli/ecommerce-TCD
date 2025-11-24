import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-us-east-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.otguhidolyvhhmvzhfid',
      password: 'ecommerceTCD12345!',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
  ],
})
export class AppModule {}
