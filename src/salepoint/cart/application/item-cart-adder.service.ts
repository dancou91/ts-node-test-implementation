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
        if (product === null) {
            throw new Error();
        }

        // Search cart if not exists then create it
        let cart = this.cartRepository.search(cartId);
        if (cart === null) {
            cart = new Cart(cartId);
        }

        cart.addCartItem(productCode, product.price);
        this.cartRepository.save(cart);

        return cart;
    }
}