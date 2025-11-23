import { State } from "../entities/state.entity";
import { StateService } from "../services/state.service";
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common"

@Controller('states')
export class StateController {
    constructor(
        private readonly service: StateService
    ) {}

    @Get()
    findAll(): Promise<State[]> {
        return this.service.findAll();
    }

    @Get('/:id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<State | null>{
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('State not found', HttpStatus.NOT_FOUND);
        } else {
            return found;   
        }  
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() State: State) :Promise<State> {
        return this.service.save(State);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() State: State
    ): Promise<State> {
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('State not found', HttpStatus.NOT_FOUND);
        } else {
            State.id = id;
            
            return this.service.save(State);
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);
        if (!found) {
            throw new HttpException('State not found', HttpStatus.NOT_FOUND);
        } else {
            await this.service.remove(id);
        }  
    }
}