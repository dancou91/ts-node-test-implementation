import { ProductFinder } from "../../../../src/salepoint/product/application/product-finder.service";
import { ProductNotFoundException } from "../../../../src/salepoint/product/application/product-not-found.exception";
import { Product } from "../../../../src/salepoint/product/domain/product.entity";
import { ProductRepository } from "../../../../src/salepoint/product/domain/product.repository";

class ProductMockRepository implements ProductRepository {

    private mockDb: Product[];

    constructor() {
        this.mockDb = [];
        this.mockDb.push(new Product("asdsad", "producto mockeado", 1.56));
    }

    search(code: string): Product | null {
        const products = this.mockDb.filter(product => product.code === code);
        return products[0] ? products[0] : null;
    }
}

describe("ProductFinder tests", () => {

    test('should return product when exist product with specified code', () => {
        const productFinder = new ProductFinder(new ProductMockRepository());
        const expectedProduct = new Product("asdsad", "producto mockeado", 1.56);
        expect(productFinder.execute("asdsad")).toStrictEqual(expectedProduct)
    })

    test('should thows ProductNotFoundException when not exists product with specified code', () => {
        let productFinder = new ProductFinder(new ProductMockRepository());
        expect(() => productFinder.execute("invenr")).toThrow(ProductNotFoundException);
    })
})