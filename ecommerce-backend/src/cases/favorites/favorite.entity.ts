import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "../products/product.entity";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customerId: string;

  @ManyToOne(() => Customer, { onDelete: "CASCADE" })
  customer: Customer;

  @Column()
  productId: string;

  @ManyToOne(() => Product, { eager: true, onDelete: "CASCADE" })
  product: Product;
}
