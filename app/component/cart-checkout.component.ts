import { CartFinder } from "../../src/salepoint/cart/application/cart-finder.service";
import { CartItemDTO } from "../../src/salepoint/cart/application/cart-item.dto";
import { CartDTO } from "../../src/salepoint/cart/application/cart.dto";
import { ItemCartAdder } from "../../src/salepoint/cart/application/item-cart-adder.service";

// Load component (singleton pattern)
import cartFinder from "./cart-finder.component";
import itemCartAdder from "./item-cart-adder.component";

interface Checkout {
    scan(cartId: string, sku: string): void;
    total(cartId: string): number;
}

const getComboDiscount = (cartItems: CartItemDTO[]) => {

    const comboDiscount = 7.50;
    const comboProductCodes = ["VOUCHER", "TSHIRT", "MUG"];

    const minimunQuantity = Math.min(...comboProductCodes.map(productCode => {
        const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
        return (cartItem) ? cartItem.getQuantity() : 0;
    }));

    if (minimunQuantity > 0) {
        comboProductCodes.forEach(productCode => {
            let item = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
            if (item) {
                item.setQuantity(item.getQuantity() - minimunQuantity);
            }
        });
    }

    return (comboDiscount * minimunQuantity);
}

const getTwoForOneDiscount = (cartItems: CartItemDTO[]) => {
    const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "VOUCHER");
    return (cartItem) ? Math.trunc(cartItem.getQuantity() / 2) * cartItem.getPrice() : 0;
}

const getBulkDiscount = (cartItems: CartItemDTO[]) => {
    const cartItem2 = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "TSHIRT");
    if (cartItem2 && cartItem2.getQuantity() >= 3) {
        const bulkDiscountPercentaje = 5;
        const bulkDiscount = 0.01 * bulkDiscountPercentaje * cartItem2.getQuantity() * cartItem2.getPrice();
        return bulkDiscount;
    } else {
        return 0;
    }
}

class CheckoutImpl implements Checkout {

    constructor(
        private cartFinder: CartFinder,
        private itemCartAdder: ItemCartAdder
    ) { }

    scan(cartId: string, sku: string): void {
        this.itemCartAdder.execute(cartId, sku);
    }

    total(cartId: string): number {

        const cart: CartDTO = this.cartFinder.execute(cartId);

        if (!cart) return 0;

        console.log("\n==========================================\n");
        console.log(cart);
        console.log("\n==========================================\n");

        return this._getTotalAmount(cart);
    }

    private _getTotalAmount(cart: CartDTO) {

        let totalAmount = cart.getTotalAmount();

        // Combo discount
        totalAmount -= getComboDiscount(cart.getItems());
        // Two for one discount
        totalAmount -= getTwoForOneDiscount(cart.getItems());
        // Bulk discount
        totalAmount -= getBulkDiscount(cart.getItems());

        return totalAmount;
    }
}

const checkout = new CheckoutImpl(cartFinder, itemCartAdder);
export default checkout;