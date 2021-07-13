import { ItemCartAdder } from "../../src/salepoint/cart/application/item-cart-adder.service";
import cartRepository from "./cart-repository.component";
import productRepository from "./product-repository";

const itemCartAdder = new ItemCartAdder(cartRepository, productRepository);
export default itemCartAdder;