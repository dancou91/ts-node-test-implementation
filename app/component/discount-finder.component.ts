import { DiscountFinder } from "../../src/salepoint/discount/application/discount-finder.service";
import cartFinder from "./cart-finder.component";

const discountFinder = new DiscountFinder(cartFinder);
export default discountFinder;