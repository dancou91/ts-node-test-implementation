import { ProductRepository } from "../../product/domain/product.repository";
import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";

export class ItemCartAdder {

    constructor(
        private cartRepository: CartRepository,
        private productRepository: ProductRepository
    ) { }

    execute(cartId: string, productCode: string): Cart {

        const product = this.productRepository.search(productCode);
        let cart = this.cartRepository.search(cartId);

        if (product === null || cart === null) {
            throw new Error();
        }

        cart.addCartItem(productCode, product.price);
        this.cartRepository.save(cart);
        
        return cart;
    }
}