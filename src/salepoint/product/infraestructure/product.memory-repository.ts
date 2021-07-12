import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

const products = [
    {
        "code": "VOUCHER",
        "name": "Cofi Voucher",
        "price": 5.00
    },
    {
        "code": "TSHIRT",
        "name": "Cofi T-Shirt",
        "price": 20.00
    },
    {
        "code": "MUG",
        "name": "Cofi Coffee Mug",
        "price": 7.50
    }
];

export class ProductMemoryRepository implements ProductRepository {

    search(code: string): Product | null {

        const productArray: Product[] = products as Product[];

        const product = productArray.find(product => product.code === code);
        return (product) ? new Product(product.code, product.code, product.price) : null;
    }

}