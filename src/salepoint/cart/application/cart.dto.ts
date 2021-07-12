import { CartItemDTO } from "./cart-item.dto";

export class CartDTO {

    constructor(
        private id: string,
        private items: CartItemDTO[] = [],
        private totalAmount = 0
    ) { }

    getId() {
        return this.id;
    }

    getItemByCode(productCode: string) {
        return this.items.find((cartItem: CartItemDTO) => cartItem.getProductCode() === productCode);
    }

    getItems() {
        return this.items;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}