import { Controller, Post, Get, Body, Param, Delete } from "@nestjs/common";
import { RatingService } from "./rating.service";

@Controller("ratings")
export class RatingController {
  constructor(private service: RatingService) {}

  @Get("product/:productId")
  findByProduct(@Param("productId") productId: string) {
    return this.service.findByProduct(productId);
  }

  @Post()
  createOrUpdate(@Body() body: any) {
    return this.service.createOrUpdate(
      body.customerId,
      body.productId,
      body.stars,
      body.comment
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
