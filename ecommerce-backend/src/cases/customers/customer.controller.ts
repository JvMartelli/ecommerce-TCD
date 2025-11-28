import { 
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put 
} from "@nestjs/common";
import { Customer } from "./customer.entity";
import { CustomerService } from "./customer.service";

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.service.findAll();
  }

  @Get('/by-supabase/:supabaseId')
  async findBySupabase(
    @Param('supabaseId') supabaseId: string
  ): Promise<Customer | null> {
    const found = await this.service.findBySupabaseId(supabaseId);
    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Customer | null> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() customer: Customer): Promise<Customer> {
    return this.service.save(customer);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() customer: Customer
  ): Promise<Customer> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    customer.id = id;
    return this.service.save(customer);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return this.service.remove(id);
  }
}
