import { Cart } from "../../../../src/salepoint/cart/domain/cart.entity";
import { CartFinder } from "../../../../src/salepoint/cart/application/cart-finder.service";
import { CartNotFoundException } from "../../../../src/salepoint/cart/application/cart-not-found.exception";
import { CartMockRepository } from "../../../mocks/cart/cart.mock-repository";
import { CartDTO } from "../../../../src/salepoint/cart/application/cart.dto";

/**
 * CartMockRepository
 */
jest.mock('../../../mocks/cart/cart.mock-repository', () => {
    return {
        CartMockRepository: jest.fn().mockImplementation(() => {
            return {
                search: (cartId: string) => {
                    const mockCartId = "sfasfdsadsadd-asdasd-sadasd";
                    return (cartId === mockCartId) ? new Cart(mockCartId) : null;
                },
                save: (cart: Cart) => { },
            };
        })
    };
});

describe("CartFinder tests", () => {

    test('should return cart when exist cart with specified id', () => {
        let cartFinder = new CartFinder(new CartMockRepository());
        const expectedCart = new CartDTO("sfasfdsadsadd-asdasd-sadasd");
        expect(cartFinder.execute("sfasfdsadsadd-asdasd-sadasd")).toStrictEqual(expectedCart)
    })

    test('should thows CartNotFoundException when not exists cart with specified id', () => {
        let cartFinder = new CartFinder(new CartMockRepository());
        expect(() => cartFinder.execute("invent")).toThrow(CartNotFoundException);
    })
})