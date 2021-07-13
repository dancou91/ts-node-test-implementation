import { CartFinder } from "../../src/salepoint/cart/application/cart-finder.service";
import { CartDTO } from "../../src/salepoint/cart/application/cart.dto";
import { ItemCartAdder } from "../../src/salepoint/cart/application/item-cart-adder.service";

// Load component (singleton pattern)
import cartFinder from "./cart-finder.component";
import discountFinder from "./discount-finder.component";
import itemCartAdder from "./item-cart-adder.component";

interface Checkout {
    scan(cartId: string, sku: string): void;
    total(cartId: string): number;
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
        const totalDiscount = discountFinder.execute(cartId);
        return cart.getTotalAmount() - totalDiscount;
    }
}

const checkout = new CheckoutImpl(cartFinder, itemCartAdder);
export default checkout;