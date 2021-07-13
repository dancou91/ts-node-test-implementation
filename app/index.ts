// Load component (singleton pattern)
import checkout from "./component/cart-checkout.component";
import cartFinder from "./component/cart-finder.component";

// =============================================================
const cartId = "asdasd-sdasd-sads-assdsadasdasdasd";

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

console.log("\n==========================================\n");
console.log(cartFinder.execute(cartId));
console.log(`\nTotal amount with discounts ${totalAmount} €`);
console.log("\n==========================================\n");