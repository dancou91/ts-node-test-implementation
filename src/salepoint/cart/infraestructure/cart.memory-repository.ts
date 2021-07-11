import { Product } from "../../product/domain/product.entity";
import { ProductRepository } from "../../product/domain/product.repository";

export class CartMemoryRepository implements ProductRepository {

    search(code: string): Product | null {
        throw new Error("Method not implemented.");
    }

}