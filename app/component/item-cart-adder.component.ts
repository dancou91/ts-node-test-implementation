import { ItemCartAdder } from "../../src/salepoint/cart/application/item-cart-adder.service";
import cartRepository from "./cart-repository.component";
import productFinder from "./product-finder.component";

const itemCartAdder = new ItemCartAdder(cartRepository, productFinder);
export default itemCartAdder;