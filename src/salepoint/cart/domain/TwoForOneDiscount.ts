import { CartItem } from "./cart-item";
import { Discount } from "./discount";

export class TwoForOneDiscount implements Discount {

    productCode: string;

    constructor(productCode: string) {
        this.productCode = productCode;
    }

    apply() {

    }

}