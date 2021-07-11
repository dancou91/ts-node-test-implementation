import { CartItem } from "./cart-item";
import { Discount } from "./discount";

export class TwoForOneDiscount implements Discount {

    private _productCode;
    private _total;

    constructor(productCode: string) {
        this._productCode = productCode;
        this._total = 0;
    }

    getDiscount(cartItems: CartItem[]): number {

        const itemsWithDiscount = cartItems.filter(item => item.productCode === this._productCode);
        return 1;
    }

}