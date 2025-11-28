import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Unique,
  JoinColumn
} from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "../products/product.entity";

@Entity("ratings")
@Unique(["customer", "product"])
export class Rating {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customerId" })
  customer: Customer;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: "int" })
  stars: number;

  @Column({ type: "text", nullable: true })
  comment: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
