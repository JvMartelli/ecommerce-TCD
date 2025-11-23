import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller('categories')
export class ProductController {

    constructor(private readonly service: ProductService) {}

    @Get()
    findAll(): Promise<Product[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }    

        return found;
    }
    @Post()
    creat(@Body() Product: Product) : Promise<Product> {
        return this.service.save(Product);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() Product : Product): Promise<Product> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        } 

        Product.id = id;

        return this.service.save(Product);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void>{
        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }    

        return this.service.remove(id);
    }






    
} 