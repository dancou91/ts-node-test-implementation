// Load component (singleton pattern)
import checkout from "./component/cart-checkout.component";

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
console.log(`Total amount ${totalAmount} €`);