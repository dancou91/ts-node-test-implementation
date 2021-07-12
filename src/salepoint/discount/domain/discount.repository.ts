import { Discount } from "./discount";

export interface DiscountRepository {

    search(code: string): Discount | null;

}