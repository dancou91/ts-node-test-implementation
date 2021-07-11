import { Cart } from "../../../../src/salepoint/cart/domain/cart.entity";
import { ItemCartAdder } from "../../../../src/salepoint/cart/application/item-cart-adder.service";
import { CartMockRepository } from "../../../mocks/cart/cart.mock-repository";
import { ProductMockRepository } from "../../../mocks/product/product.mock-repository";

/**
 * CartMockRepository
 */
jest.mock('../../../mocks/cart/cart.mock-repository', () => {
    return {
        CartMockRepository: jest.fn().mockImplementation(() => {
            return {
                search: (cartID: string) => new Cart("sfasfdsadsadd-asdasd-sadasd"),
                save: (cart: Cart) => { },
            };
        })
    };
});

describe("ItemCartAdder tests", () => {

    // beforeEach(() => {
    //     // Clears the record of calls to the mock constructor function and its methods
    //     CartRepository.mockClear();
    // });

    it('should return cart when exist cart with specified id', () => {

        const productRepository = new ProductMockRepository();
        const cartRepository = new CartMockRepository();
        const itemCartAdder = new ItemCartAdder(cartRepository, productRepository);

        jest.spyOn(cartRepository, 'save');

        const expectedCart: Cart = new Cart("sfasfdsadsadd-asdasd-sadasd");
        expectedCart.addCartItem("product-1", 1.56);

        itemCartAdder.execute("sfasfdsadsadd-asdasd-sadasd", "product-1");

        expect(expectedCart.totalAmount).toStrictEqual(1.56);
        expect(cartRepository.save).toHaveBeenCalledWith(expectedCart);
    });

    // it('should return cart when exist cart with specified id', () => {

    //     const productRepository = new ProductMockRepository();
    //     const cartRepository = new CartMockRepository();
    //     const itemCartAdder = new ItemCartAdder(cartRepository, productRepository);

    //     jest.spyOn(cartRepository, 'save');

    //     const expectedCart: Cart = new Cart("sfasfdsadsadd-asdasd-sadasd");
    //     expectedCart.addCartItem("product-1", 1.56);
    //     expectedCart.addCartItem("product-2", 2.10);

    //     itemCartAdder.execute("sfasfdsadsadd-asdasd-sadasd", "product-1");
    //     itemCartAdder.execute("sfasfdsadsadd-asdasd-sadasd", "product-2");

    //     expect(expectedCart.totalAmount).toStrictEqual(3.66);
    //     expect(cartRepository.save).toHaveBeenCalledWith(expectedCart);
    // });
})