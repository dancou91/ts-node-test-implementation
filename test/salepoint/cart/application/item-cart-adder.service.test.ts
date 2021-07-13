import { Cart } from "../../../../src/salepoint/cart/domain/cart.entity";
import { ItemCartAdder } from "../../../../src/salepoint/cart/application/item-cart-adder.service";
import { CartMockRepository } from "../../../mocks/cart/cart.mock-repository";
import { ProductMockRepository } from "../../../mocks/product/product.mock-repository";
import { ProductFinder } from "../../../../src/salepoint/product/application/product-finder.service";

/**
 * CartMockRepository
 */
jest.mock('../../../mocks/cart/cart.mock-repository', () => {
    return {
        CartMockRepository: jest.fn().mockImplementation(() => {
            return {
                search: (cartID: string) => {
                    const mockCart: Cart = new Cart("sfasfdsadsadd-asdasd-sadasd");
                    mockCart.addCartItem("product-1", 1.56);
                    return mockCart;
                },
                save: (cart: Cart) => { },
            };
        })
    };
});

describe("ItemCartAdder tests", () => {

    it('should return cart when exist cart with specified id', () => {

        // Init application service
        const productRepository = new ProductMockRepository();
        const productFinder = new ProductFinder(productRepository);
        const cartRepository = new CartMockRepository();
        const itemCartAdder = new ItemCartAdder(cartRepository, productFinder);

        jest.spyOn(cartRepository, 'save');

        // Expected cart
        const cartId = "sfasfdsadsadd-asdasd-sadasd";
        const expectedCart: Cart = new Cart(cartId);
        expectedCart.addCartItem("product-1", 1.56);
        expectedCart.addCartItem("product-1", 1.56);

        itemCartAdder.execute("sfasfdsadsadd-asdasd-sadasd", "product-1");

        expect(expectedCart.getCartItem("product-1")?.quantity).toStrictEqual(2);
        expect(expectedCart.totalAmount).toStrictEqual(3.12);
        expect(cartRepository.save).toHaveBeenCalledWith(expectedCart);
    });

    it('should return cart when exist cart with specified id', () => {

        // Init application service
        const productRepository = new ProductMockRepository();
        const productFinder = new ProductFinder(productRepository);
        const cartRepository = new CartMockRepository();
        const itemCartAdder = new ItemCartAdder(cartRepository, productFinder);

        jest.spyOn(cartRepository, 'save');

        // Expected cart
        const cartId = "sfasfdsadsadd-asdasd-sadasd";
        const expectedCart: Cart = new Cart(cartId);
        expectedCart.addCartItem("product-1", 1.56);
        expectedCart.addCartItem("product-2", 2.10);

        itemCartAdder.execute("sfasfdsadsadd-asdasd-sadasd", "product-2");

        expect(expectedCart.getCartItem("product-1")?.quantity).toStrictEqual(1);
        expect(expectedCart.getCartItem("product-2")?.quantity).toStrictEqual(1);
        expect(expectedCart.totalAmount).toStrictEqual(3.66);
        expect(cartRepository.save).toHaveBeenCalledWith(expectedCart);
    });
})