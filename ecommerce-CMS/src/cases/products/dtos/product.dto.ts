import type { BrandDTO } from "@/cases/brands/dtos/brand.dto";
import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
  id?: string;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  imageUrl?: string;
  category: CategoryDTO;
  brand?: BrandDTO;
}
