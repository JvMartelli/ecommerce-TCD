import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "../products/product.entity";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @ManyToOne(() => Product, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;
}
