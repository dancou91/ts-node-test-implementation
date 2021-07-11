import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

export class ProductMemoryRepository implements ProductRepository {
    
    search(cide: string): Product | null {
        throw new Error("Method not implemented.");
    }
    
}