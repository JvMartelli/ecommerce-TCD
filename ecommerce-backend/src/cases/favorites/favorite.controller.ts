import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { FavoriteService } from "./favorite.service";

@Controller("favorites")
export class FavoriteController {
  constructor(private service: FavoriteService) {}

  @Get(":customerId")
  findByCustomer(@Param("customerId") id: string) {
    return this.service.findByCustomer(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body.customerId, body.productId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
