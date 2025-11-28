import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Favorite } from "./favorite.entity";

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private repo: Repository<Favorite>
  ) {}

  findByCustomer(customerId: string) {
    return this.repo.find({
      where: {
        customer: { id: customerId }
      },
      relations: ["product"]
    });
  }

  async create(customerId: string, productId: string) {
    const existing = await this.repo.findOne({
      where: {
        customer: { id: customerId },
        product: { id: productId }
      },
      relations: ["product"]
    });

    if (existing) return existing;

    const fav = this.repo.create({
      customer: { id: customerId },
      product: { id: productId }
    });

    return this.repo.save(fav);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
