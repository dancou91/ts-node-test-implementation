import { Product } from "./product.entity";

export interface ProductRepository {

    search(code: string): Product | null;
    
}