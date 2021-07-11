import { Cart } from "../../../../src/salepoint/cart/domain/cart.entity";
import { CartRepository } from "../../../../src/salepoint/cart/domain/cart.repository";
import { CartFinder } from "../../../../src/salepoint/cart/application/cart-finder.service";
import { CartNotFoundException } from "../../../../src/salepoint/cart/application/cart-not-found.exception";

class CartMockRepository implements CartRepository {

    private mockDb: Cart[];

    constructor() {
        this.mockDb = [];
        this.mockDb.push(new Cart("sfasfdsadsadd-asdasd-sadasd"));
    }

    search(cartId: string): Cart | null {
        const carts = this.mockDb.filter(cart => cart.cartId === cartId);
        return carts[0] ? carts[0] : null;
    }

    save(cart: Cart): void {
        throw new Error("Method not implemented.");
    }
}

describe("CartFinder tests", () => {

    test('should return cart when exist cart with specified id', () => {
        let cartFinder = new CartFinder(new CartMockRepository());
        const expectedCart = new Cart("sfasfdsadsadd-asdasd-sadasd", [], 0);
        expect(cartFinder.execute("sfasfdsadsadd-asdasd-sadasd")).toStrictEqual(expectedCart)
    })

    test('should thows CartNotFoundException when not exists cart with specified id', () => {
        let cartFinder = new CartFinder(new CartMockRepository());
        expect(() => cartFinder.execute("invent")).toThrow(CartNotFoundException);
    })
})