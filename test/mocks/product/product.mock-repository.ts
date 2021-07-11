import { Product } from "../../../src/salepoint/product/domain/product.entity";
import { ProductRepository } from "../../../src/salepoint/product/domain/product.repository";

export class ProductMockRepository implements ProductRepository {

    private mockDb: Product[];

    constructor() {
        this.mockDb = [];
        this.mockDb.push(new Product("product-1", "producto mockeado 1", 1.56));
        this.mockDb.push(new Product("product-2", "producto mockeado 2", 2.10));
        this.mockDb.push(new Product("product-3", "producto mockeado 3", 3.04));
    }

    search(code: string): Product | null {
        const products = this.mockDb.filter(product => product.code === code);
        return products[0] ? products[0] : null;
    }
}