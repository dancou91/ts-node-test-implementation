import { CartItemDTO } from "../../cart/application/cart-item.dto";

export class DiscountTwoForOne {

    public static apply(
        cartItems: CartItemDTO[],
        productCode: string
    ) {
        const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
        return (cartItem) ? Math.trunc(cartItem.getQuantity() / 2) * cartItem.getPrice() : 0;
    }
}