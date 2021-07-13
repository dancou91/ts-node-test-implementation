import { CartItem } from "../domain/cart-item";
import { Cart } from "../domain/cart.entity";
import { CartRepository } from "../domain/cart.repository";

interface CartDatabase {
    id: string,
    items: { productCode: string, price: number, quantity: number }[],
    totalAmount: number
}

let carts: CartDatabase[] = [];

export class CartMemoryRepository implements CartRepository {

    search(cartId: string): Cart | null {

        const cart = carts.find(cart => cart.id === cartId);

        return (cart)
            ? new Cart(
                cart.id,
                cart.items.map(item => new CartItem(item.productCode, item.price, item.quantity)),
                cart.totalAmount)
            : null;
    }

    save(cart: Cart): void {

        const cartToSave = {
            id: cart.cartId,
            items: cart.items.map(item => {
                return {
                    productCode: item.productCode,
                    price: item.price,
                    quantity: item.quantity
                }
            }),
            totalAmount: cart.totalAmount
        };

        const index = carts.map(c => c.id).indexOf(cart.cartId);

        if (index === -1) {
            carts.push(cartToSave)
        } else {
            carts[index] = cartToSave;
        }
    }
}