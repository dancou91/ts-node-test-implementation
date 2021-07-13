import { ProductFinder } from "../../product/application/product-finder.service";
import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";

export class ItemCartAdder {

    constructor(
        private cartRepository: CartRepository,
        private productFinder: ProductFinder
    ) { }

    execute(cartId: string, productCode: string): Cart {

        const product = this.productFinder.execute(productCode);

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