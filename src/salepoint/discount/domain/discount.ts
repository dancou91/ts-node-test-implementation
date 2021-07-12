import { DiscountType } from "./discount-type.enum";

export abstract class Discount {

    private readonly type: DiscountType;

    constructor(type: DiscountType) {
        this.type = type;
    }

}