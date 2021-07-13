import { CartItemDTO } from "../../cart/application/cart-item.dto";

export class DiscountCombo {

    public static apply(
        cartItems: CartItemDTO[],
        comboProductCodes: string[],
        comboDiscount: number
    ) {
        const comboQuantity = this._getComboQuantity(cartItems, comboProductCodes);

        // TODO change method output to return not affected cart items
        if (comboQuantity > 0) {
            comboProductCodes.forEach(productCode => {
                let item = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
                if (item) {
                    item.setQuantity(item.getQuantity() - comboQuantity);
                }
            });
        }

        return (comboDiscount * comboQuantity);
    }

    private static _getComboQuantity(cartItems: CartItemDTO[], comboProductCodes: string[]) {

        const itemQuantities = comboProductCodes.map(productCode => {
            const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
            return (cartItem) ? cartItem.getQuantity() : 0;
        })

        return Math.min(...itemQuantities);
    }
}