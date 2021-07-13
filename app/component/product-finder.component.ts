import { ProductFinder } from "../../src/salepoint/product/application/product-finder.service";
import productRepository from "./product-repository";

const productFinder = new ProductFinder(productRepository);
export default productFinder;