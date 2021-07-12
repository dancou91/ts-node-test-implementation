import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";
import { CartItemDTO } from "./cart-item.dto";
import { CartNotFoundException } from "./cart-not-found.exception";
import { CartDTO } from "./cart.dto";

export class CartFinder {

    constructor(private repository: CartRepository) { }

    execute(cartId: string): CartDTO {

        let cart: Cart | null = this.repository.search(cartId);

        if (cart === null) {
            throw new CartNotFoundException();
        }

        return new CartDTO(
            cart.cartId,
            cart.items.map(cartItem => {
                const { productCode, price, quantity } = cartItem;
                return new CartItemDTO(productCode, price, quantity);
            }),
            cart.totalAmount
        );
    }
}