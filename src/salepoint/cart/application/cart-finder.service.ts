import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";
import { CartNotFoundException } from "./cart-not-found.exception";

export class CartFinder {

    constructor(private repository: CartRepository) { }

    execute(cartId: string): Cart {
        let cart = this.repository.search(cartId);

        if (cart === null) {
            throw new CartNotFoundException();
        }

        return cart;
    }
}