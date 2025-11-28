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
      where: { customerId },
      relations: ["product"],
    });
  }

  async create(customerId: string, productId: string) {
    const existing = await this.repo.findOne({
      where: { customerId, productId },
    });

    if (existing) return existing; // já favoritado

    const fav = this.repo.create({ customerId, productId });
    return this.repo.save(fav);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
