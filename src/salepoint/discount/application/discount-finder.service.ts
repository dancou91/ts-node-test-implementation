import { CartFinder } from "../../cart/application/cart-finder.service";
import { CartItemDTO } from "../../cart/application/cart-item.dto";
import { CartDTO } from "../../cart/application/cart.dto";

export class DiscountFinder {

    constructor(private cartFinder: CartFinder) { }

    execute(cartId: string) {
        let cart: CartDTO = this.cartFinder.execute(cartId);
        return this._getTotalDiscount(cart);
    }

    private _getTotalDiscount(cart: CartDTO): number {

        let totalDiscount = 0;

        // Combo discount
        totalDiscount += getComboDiscount(cart.getItems());
        // Two for one discount
        totalDiscount += getTwoForOneDiscount(cart.getItems());
        // Bulk discount
        totalDiscount += getBulkDiscount(cart.getItems());

        return totalDiscount;
    }
}

const getComboDiscount = (cartItems: CartItemDTO[]) => {

    const comboDiscount = 7.50;
    const comboProductCodes = ["VOUCHER", "TSHIRT", "MUG"];

    const minimumQuantity = Math.min(...comboProductCodes.map(productCode => {
        const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
        return (cartItem) ? cartItem.getQuantity() : 0;
    }));

    if (minimumQuantity > 0) {
        comboProductCodes.forEach(productCode => {
            let item = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
            if (item) {
                item.setQuantity(item.getQuantity() - minimumQuantity);
            }
        });
    }

    return (comboDiscount * minimumQuantity);
}

const getTwoForOneDiscount = (cartItems: CartItemDTO[]) => {
    const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "VOUCHER");
    return (cartItem) ? Math.trunc(cartItem.getQuantity() / 2) * cartItem.getPrice() : 0;
}

const getBulkDiscount = (cartItems: CartItemDTO[]) => {

    const minimumQuantity = 3;
    const bulkDiscountPercentaje = 5;

    const cartItem2 = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "TSHIRT");
    if (cartItem2 && cartItem2.getQuantity() >= minimumQuantity) {
        const bulkDiscount = 0.01 * bulkDiscountPercentaje * cartItem2.getQuantity() * cartItem2.getPrice();
        return bulkDiscount;
    } else {
        return 0;
    }
}