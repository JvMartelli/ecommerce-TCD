import type { CustomerDTO } from "@/cases/customer/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface OrderItem{
    id?: string;
    product: ProductDTO;
    quantity: number;
    value: number;
}
export interface OrderDTO {
    id?: string;
    custumer: CustomerDTO;
    status: string;
    total: number;
    items: OrderItem[];
    createdAt: Date;
    updateAt: Date;
}