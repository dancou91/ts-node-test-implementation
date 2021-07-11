import { CartItem } from "./cart-item";

export interface Discount {

    getDiscount(cartItems: CartItem[]): number;

}