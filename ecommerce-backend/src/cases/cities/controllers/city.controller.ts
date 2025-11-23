import { City } from "../entities/city.entity";
import { CityService } from "../services/city.service";
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common"

@Controller('cities')
export class CityController {
    constructor(
        private readonly service: CityService
    ) {}

    @Get()
    findAll(): Promise<City[]> {
        return this.service.findAll();
    }

    @Get('/:id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<City | null>{
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        } else {
            return found;   
        }  
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() City: City) :Promise<City> {
        return this.service.save(City);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() City: City
    ): Promise<City> {
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        } else {
            City.id = id;
            
            return this.service.save(City);
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        } else {
            await this.service.remove(id);
        }  
    }
}