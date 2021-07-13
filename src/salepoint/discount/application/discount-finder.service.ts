import { CartFinder } from "../../cart/application/cart-finder.service";
import { CartDTO } from "../../cart/application/cart.dto";
import { DiscountBulk } from "./discount-bulk.service";
import { DiscountCombo } from "./discount-combo.service";
import { DiscountTwoForOne } from "./discount-two-for-one.service";

export class DiscountFinder {

    constructor(private cartFinder: CartFinder) { }

    execute(cartId: string) {
        let cart: CartDTO = this.cartFinder.execute(cartId);
        return this._getTotalDiscount(cart);
    }

    private _getTotalDiscount(cart: CartDTO): number {

        let totalDiscount = 0;

        // Apply discounts
        totalDiscount += DiscountCombo.apply(cart.getItems(), ["VOUCHER", "TSHIRT", "MUG"], 7.50);
        totalDiscount += DiscountTwoForOne.apply(cart.getItems(), "VOUCHER");
        totalDiscount += DiscountBulk.apply(cart.getItems(), "TSHIRT");

        return totalDiscount;
    }
}