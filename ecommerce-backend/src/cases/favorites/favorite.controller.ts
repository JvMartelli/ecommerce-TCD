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
  create(
    @Body("customerId") customerId: string,
    @Body("productId") productId: string
  ) {
    return this.service.create(customerId, productId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
