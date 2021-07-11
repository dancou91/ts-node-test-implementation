import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

export class ProductMemoryRepository implements ProductRepository {
    
    search(code: string): Product | null {
        throw new Error("Method not implemented.");
    }
    
}