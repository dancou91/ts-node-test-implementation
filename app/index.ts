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

const getComboDiscount = (cartItems: CartItemDTO[]) => {

    const comboDiscount = 7.50;
    const comboProductCodes = ["VOUCHER", "TSHIRT", "MUG"];

    const minimunQuantity = Math.min(...comboProductCodes.map(productCode => {
        const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
        return (cartItem) ? cartItem.getQuantity() : 0;
    }));

    if (minimunQuantity > 0) {
        comboProductCodes.forEach(productCode => {
            let item = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
            if (item) {
                item.setQuantity(item.getQuantity() - minimunQuantity);
            }
        });
    }

    return (comboDiscount * minimunQuantity);
}

const getTwoForOneDiscount = (cartItems: CartItemDTO[]) => {
    const cartItem = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "VOUCHER");
    return (cartItem) ? Math.trunc(cartItem.getQuantity() / 2) * cartItem.getPrice() : 0;
}

const getBulkDiscount = (cartItems: CartItemDTO[]) => {
    const cartItem2 = cartItems.find((cartItem: CartItemDTO) => cartItem.getProductCode() === "TSHIRT");
    if (cartItem2 && cartItem2.getQuantity() >= 3) {
        const bulkDiscountPercentaje = 5;
        const bulkDiscount = 0.01 * bulkDiscountPercentaje * cartItem2.getQuantity() * cartItem2.getPrice();
        return bulkDiscount;
    } else {
        return 0;
    }
}

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

        const cart: CartDTO = this.cartFinder.execute(cartId);

        if (!cart) return 0;

        console.log(cart);

        let cartItems = cart.getItems();
        let totalAmount = cart.getTotalAmount();

        // Combo discount
        totalAmount -= getComboDiscount(cartItems);
        // Two for one discount
        totalAmount -= getTwoForOneDiscount(cartItems);
        // Bulk discount
        totalAmount -= getBulkDiscount(cartItems);

        return totalAmount;
    }
}

// ==================================================================
// MAIN CODE
// ==================================================================

const checkout = new CheckoutImpl(cartFinder, itemCartAdder);
const cartId = "asdasd-sdasd-sads";

// Bulk discount
checkout.scan(cartId, "TSHIRT");
checkout.scan(cartId, "TSHIRT");
checkout.scan(cartId, "TSHIRT");

// Two for one discount
checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "VOUCHER");

// Combo discount
checkout.scan(cartId, "VOUCHER");
checkout.scan(cartId, "TSHIRT");
checkout.scan(cartId, "MUG");

const totalAmount = checkout.total(cartId);
console.log(`Total amount ${totalAmount} €`)