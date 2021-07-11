import { Cart } from "../../../src/salepoint/cart/domain/cart.entity";
import { CartRepository } from "../../../src/salepoint/cart/domain/cart.repository";

export class CartMockRepository implements CartRepository {

    search(cartId: string): Cart | null {
        throw new Error("Method not implemented.");
    }

    save(cart: Cart): void {
        throw new Error("Method not implemented.");
    }
}