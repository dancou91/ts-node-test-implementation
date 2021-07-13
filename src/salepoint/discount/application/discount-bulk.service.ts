import { CartItemDTO } from "../../cart/application/cart-item.dto";

export class DiscountBulk {

    public static apply(
        cartItems: CartItemDTO[],
        productCode: string,
        minimumQuantity = 3,
        bulkDiscountPercentaje = 5
    ) {
        const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);

        return (cartItem && cartItem.getQuantity() >= minimumQuantity)
            ? 0.01 * bulkDiscountPercentaje * cartItem.getQuantity() * cartItem.getPrice()
            : 0;
    }

}