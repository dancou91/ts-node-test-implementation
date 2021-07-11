import { ProductFinder } from "../../../../src/salepoint/product/application/product-finder.service";
import { Product } from "../../../../src/salepoint/product/domain/product.entity";
import { ProductRepository } from "../../../../src/salepoint/product/domain/product.repository";

class ProductMockRepository implements ProductRepository {
    search(code: string): Product {
        return new Product("asdsad", "producto mockeado", 1.56);
    }
}

test('should return product by product code', () => {
    let productFinder = new ProductFinder(new ProductMockRepository());
    expect(productFinder.execute("asdsad")).toStrictEqual(new Product("asdsad", "producto mockeado", 1.56))
})