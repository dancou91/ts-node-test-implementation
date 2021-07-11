import { Product } from "./product.entity";

export interface ProductRepository {

    search(cide: string): Product | null;
    
}