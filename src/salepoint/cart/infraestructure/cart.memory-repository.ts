import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";

export class CartMemoryRepository implements CartRepository {

    private cart: Cart;

    constructor() {
        this.cart = new Cart("asdasd-sdasd-sads");
    }

    search(cartId: string): Cart | null {
        return this.cart;
    }

    save(cart: Cart): void {
        this.cart = cart;
    }


}