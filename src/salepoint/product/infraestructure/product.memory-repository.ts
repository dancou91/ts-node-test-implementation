import { Product } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";

interface ProductDatabase {
    code: string,
    name: string,
    price: number
}

const products: ProductDatabase[] = [
    {
        code: "VOUCHER",
        name: "Cofi Voucher",
        price: 5.00
    },
    {
        code: "TSHIRT",
        name: "Cofi T-Shirt",
        price: 20.00
    },
    {
        code: "MUG",
        name: "Cofi Coffee Mug",
        price: 7.50
    }
];

export class ProductMemoryRepository implements ProductRepository {

    search(productCode: string): Product | null {
        const product = products.find(product => product.code === productCode);
        return (product) ? new Product(product.code, product.code, product.price) : null;
    }

}