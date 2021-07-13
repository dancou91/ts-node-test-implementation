import { CartFinder } from "../../src/salepoint/cart/application/cart-finder.service";
import cartRepository from "./cart-repository.component";

const cartFinder = new CartFinder(cartRepository);
export default cartFinder;