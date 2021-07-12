import { CartFinder } from "../src/salepoint/cart/application/cart-finder.service";
import { CartItemDTO } from "../src/salepoint/cart/application/cart-item.dto";
import { CartDTO } from "../src/salepoint/cart/application/cart.dto";
import { ItemCartAdder } from "../src/salepoint/cart/application/item-cart-adder.service";
import { CartMemoryRepository } from "../src/salepoint/cart/infraestructure/cart.memory-repository";
import { ProductMemoryRepository } from "../src/salepoint/product/infraestructure/product.memory-repository";

const cartRepository = new CartMemoryRepository();
const productRepository = new ProductMemoryRepository();

const cartFinder = new CartFinder(cartRepository);
const itemCartAdder = new ItemCartAdder(cartRepository, productRepository);

interface Checkout {
    scan(cartId: string, sku: string): void;
    total(cartId: string): number;
}

class CheckoutImpl implements Checkout {

    constructor(
        private cartFinder: CartFinder,
        private itemCartAdder: ItemCartAdder
    ) { }

    scan(cartId: string, sku: string): void {
        this.itemCartAdder.execute(cartId, sku);
    }

    total(cartId: string): number {

        // Get discount avalilable

        const cart: CartDTO = this.cartFinder.execute(cartId);

        if (!cart) return 0;

        let totalAmount = cart.getTotalAmount();

        // Combo discount

        // Two for one discount
        const cartItem = cart.getItemByCode("VOUCHER");
        if (cartItem) {
            const twoForOneDiscount = Math.trunc(cartItem.getQuantity() / 2) * cartItem.getPrice();
            totalAmount -= twoForOneDiscount;
        }

        // Bulk discount
        const cartItem2 = cart.getItemByCode("TSHIRT");
        if (cartItem2 && cartItem2.getQuantity() >= 3) {
            const bulkDiscountPercentaje = 5;
            const bulkDiscount = 0.01 * bulkDiscountPercentaje * cartItem2.getQuantity() * cartItem2.getPrice();
            totalAmount -= bulkDiscount;
        }

        return totalAmount;
    }
}

// ==================================================================
// MAIN CODE
// ==================================================================
console.log("execute index.ts")

const checkout = new CheckoutImpl(cartFinder, itemCartAdder);
const cartId = "asdasd-sdasd-sads";

checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "TSHIRT");
checkout.scan(cartId, "TSHIRT");
checkout.scan(cartId, "TSHIRT");
// checkout.scan(cartId, "MUG");

const totalAmount = checkout.total(cartId);
console.log(`Total amount ${totalAmount} €`)