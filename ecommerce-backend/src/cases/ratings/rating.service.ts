import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rating } from "./rating.entity";

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private repo: Repository<Rating>
  ) {}

  findByProduct(productId: string) {
    return this.repo.find({
      where: { product: { id: productId } },
      relations: ["customer"]
    });
  }

  findByCustomer(productId: string, customerId: string) {
    return this.repo.findOne({
      where: {
        product: { id: productId },
        customer: { id: customerId }
      }
    });
  }

  async createOrUpdate(
    customerId: string,
    productId: string,
    stars: number,
    comment?: string
  ) {
    let rating = await this.findByCustomer(productId, customerId);

  
    if (rating) {
      rating.stars = stars;
      rating.comment = comment ?? null;
      return this.repo.save(rating);
    }

   
    rating = this.repo.create({
      customer: { id: customerId },
      product: { id: productId },
      stars,
      comment: comment ?? null
    });

    return this.repo.save(rating);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
