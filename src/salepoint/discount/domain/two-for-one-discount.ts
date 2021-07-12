
import { Discount } from "./discount";
import { DiscountType } from "./discount-type.enum";

export class TwoForOneDiscount extends Discount {

    constructor() {
        super(DiscountType.TWO_FOR_ONE)
    }

}