import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";
import { ProductNotFoundException } from "./product-not-found.exception";

export class ProductFinder {

    constructor(private repository: ProductRepository) { }

    execute(productCode: string): Product {

        let product = this.repository.search(productCode);

        if (product === null) {
            throw new ProductNotFoundException();
        }

        return product;
    }
}